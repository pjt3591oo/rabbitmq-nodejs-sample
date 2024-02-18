const amqp = require('amqplib');

const amqpURL = 'amqp://admin:admin@localhost:5672';

const sendMessage = async () => {
  const connection = await amqp.connect(amqpURL);
  const channel = await connection.createConfirmChannel();
  console.log('Publisher is connected to RabbitMQ');
  let counter = 1;

  await setInterval(() => {
    //메시지 카운터는 늘어나고..
    const msg = `hello ${counter++}`;
    console.log(msg);
    publishToChannel(channel, {
      exchangeName: 'MyTest',
      routingKey: 'GoodBye',
      data: { Message: msg },
    });
    //3초마다 전송
  }, 3000);
};

const publishToChannel = (channel, { routingKey, exchangeName, data }) => {
  return new Promise((resolve, reject) => {
    channel.publish(
      exchangeName, 
      routingKey,
      Buffer.from(JSON.stringify(data), 'utf-8'),
      { persistent: true },
      (err, ok) => {
        if (err) {
          return reject(err);
        }
        resolve();
      }
    );
  });
};

sendMessage();