const open = require('amqplib').connect('amqp://localhost');
const { Client } = require('@elastic/elasticsearch');

const esClient = new Client({ node: 'http://localhost:9200' });
const exchangeName = 'logs';

const severities = ['info', 'warning', 'error'];

async function createChannel(conn) {
  const channel = await conn.createChannel();

  return { conn, channel };
}

async function consumeFromChannel({ channel }) {
  await channel.assertExchange(exchangeName, 'direct', { durable: false });
  const { queue } = await channel.assertQueue('', { exclusive: true });
  console.log(`Listening to \`${exchangeName}\` exchange`);

  severities.forEach(severity => {
    channel.bindQueue(queue, exchangeName, severity);
  });

  channel.consume(queue, handleMessageFromPublishers);
}

function handleMessageFromPublishers(msg) {
  const message = msg.content.toString();
  const messageSeverity = msg.fields.routingKey;
  const selectedSeverity = process.argv[2];

  if (selectedSeverity === messageSeverity) {
    return saveMessageToES(message);
  }

  console.log(message);
}

async function saveMessageToES(message) {
  return esClient
    .index({
      index: exchangeName,
      body: { content: message }
    })
    .catch(err => console.log(err));
}

async function setupElasticsearch({ conn, channel }) {
  const elasticIndex = await esClient.indices.exists({
    index: exchangeName
  });

  if (!elasticIndex.body) {
    try {
      await esClient.indices.create({ index: exchangeName });
    } catch (err) {
      console.error('Create index error', err);
    }
  }

  return {
    conn,
    channel
  };
}

function init() {
  open
    .then(createChannel)
    .then(setupElasticsearch)
    .then(consumeFromChannel)
    .catch(err => console.warn(err));
}

init();
