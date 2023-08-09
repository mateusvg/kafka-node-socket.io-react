// ***INICIA O ZOOKEEPER***
// zookeeper-server-start.bat ../../config/zookeeper.Properties

// ***INICIA O KAFKA***
// kafka-server-start.bat ../../config/server.properties

// ***CRIAR TÓPICOS***
// kafka-topics.bat --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic NOMEMEUDOTOPICO


const kafka = require('kafka-node');
const express = require('express');
const port = 3000;
const app = express();

const Consumer = kafka.Consumer,
 client = new kafka.KafkaClient('localhost:9092'),
 consumer = new Consumer(
 client, [ { topic: 'NOMEMEUDOTOPICO', partition: 0 } ], { autoCommit: false });

const server = app.listen(port, () => {
  console.log(`Listening on port ${server.address().port}`);
});
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  }
});

io.on('connection', client => {
  console.log('Connected', client);
  consumer.on('message', function (message) {
    console.log(message);
    client.emit('event', message.value);
  });
  client.on('disconnect', () => { 
    console.log('Client disconnected');
   });
});