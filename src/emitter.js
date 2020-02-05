const open = require('amqplib').connect('amqp://localhost');

const exchangeName = 'logs';

async function setupExchange(conn) {
  const channel = await conn.createChannel();
  await channel.assertExchange(exchangeName, 'fanout', { durable: false });

  return { conn, channel };
}

async function publishDefaultMessage({ conn, channel }) {
  await channel.publish(exchangeName, '', Buffer.from('Incredible message'));

  return {
    conn,
    channel
  };
}

async function closeConnection({ conn, channel }) {
  await channel.close();
  await conn.close();
}

function init() {
  open
    .then(setupExchange)
    .then(publishDefaultMessage)
    .then(closeConnection)
    .then(() => process.exit(0))
    .catch(err => console.warn(err));
}

init();
