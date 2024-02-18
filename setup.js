const amqp = require('amqplib');

const MQ_URL = 'amqp://admin:admin@localhost:5672';

const script = async ()=> {
    const connection = await amqp.connect(MQ_URL)
  
    // 채널을 만들고
    const channel = await connection.createChannel()
  
    // 1. Exchange를 만들자.
    await channel.assertExchange('MyTest', 'direct', { durable: true })
  
    // 2. Queue를 만들고
    await channel.assertQueue('test', { durable: true })
  
    // 3. 만들어진 Queue에 대해서 Exchange에서 바인딩 해주자.
    //                       Queue, Exchange,  Routing Key
    await channel.bindQueue('test', 'MyTest', 'GoodBye')
  
    console.log('설정 끝')
    process.exit()
}

script();