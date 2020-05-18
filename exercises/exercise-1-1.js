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

 //'one' is the collection we have created 
 //{ name: 'Buck Rogers' } is an object we inserted into the database

 await db.collection('one').insertOne({ name: 'Buck Rogers' });

 // close the connection to the databse server
 client.close();
 console.log('disconnected!');

 /*
 Step 1: Start mongodb
  1.1: Open Powershell and execute the following command
  1.1: mongod --dbpath "C:\Users\gange\Documents\data\db"

 Step 2: Start mongo
  2.1: Open Powershell and execute 'mongo' to connect to the database that was started from the above step
 */
}

dbFunction('exercise_one');