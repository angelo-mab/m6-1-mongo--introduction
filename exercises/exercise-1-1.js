'use strict';

const { MongoClient } = require('mongodb'); // require MongoClient 

const dbFunction = async (dbName) => {

 //create a new client
 const client = new MongoClient('mongodb://localhost:27017', {
  useUnifiedTopology: true,
 });

 // open the connection to the database server
 await client.connect();
 console.log('connected!');

 const db = client.db(dbName);

 await db.collection('one').insertOne({ name: 'Buck Rogers' });

 // close the connection to the databse server
 client.close();
 console.log('disconnected!');

}

dbFunction('exercise_one');