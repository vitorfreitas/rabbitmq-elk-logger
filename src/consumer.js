const open = require('amqplib').connect('amqp://localhost');
const { Client } = require('@elastic/elasticsearch');

const esClient = new Client({ node: 'http://localhost:9200' });
const exchangeName = 'logs';

async function createChannel(conn) {
  const channel = await conn.createChannel();

  return { conn, channel };
}

async function consumeFromChannel({ channel }) {
  await channel.assertExchange(exchangeName, 'fanout', { durable: false });
  const { queue } = await channel.assertQueue('', { exclusive: true });
  console.log(`Listening to \`${exchangeName}\` exchange`);
  channel.bindQueue(queue, exchangeName, '');
  channel.consume(queue, saveMessageToES);
}

async function saveMessageToES(message) {
  const content = message.content.toString();

  return esClient
    .index({
      index: exchangeName,
      body: { content }
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
