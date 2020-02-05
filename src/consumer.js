const open = require('amqplib').connect('amqp://localhost');

const exchangeName = 'logs';

async function createChannel(conn) {
  const channel = await conn.createChannel();

  return { conn, channel };
}

async function consumeFromChannel({ channel }) {
  await channel.assertExchange(exchangeName, 'fanout', {
    durable: false
  });
  const { queue } = await channel.assertQueue('', { exclusive: true });
  console.log(`Listening to \`${exchangeName}\` exchange`);
  channel.bindQueue(queue, exchangeName, '');
  channel.consume(queue, logMessage);
}

function logMessage(message) {
  console.log(message.content.toString());
}

function init() {
  open
    .then(createChannel)
    .then(consumeFromChannel)
    .catch(err => console.warn(err));
}

init();
