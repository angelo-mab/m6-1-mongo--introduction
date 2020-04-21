'use strict';
const { MongoClient } = require('mongodb');
const assert = require('assert');
const fs = require('file-system');

// global variable
const client = new MongoClient('mongodb://localhost:27017', { 
 useUnifiedTopology: true,
});

const greetings = JSON.parse(fs.readFileSync('data/greetings.json'));

const batchImport = async () => {
 try{
  await client.connect();

  const db = client.db('exercise');

  const r = await db.collection('greetings').insertMany(greetings);
  assert.equal(greetings.length, r.insertCount);
  console.log('naisu');
 } catch(err) {
  console.log(err.stack);
 }

 client.close();
};

batchImport();
