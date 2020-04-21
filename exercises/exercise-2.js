'use strict';

const { MongoClient } = require('mongodb');
const assert = require('assert');

const createGreeting = async (req, res) => {
  const client = new MongoClient('mongodb://localhost:27017', {
    useUnifiedTopology: true,
  });
  try {
    // connect
    await client.connect();

    // declare db - 'exercises' as database
    const db = client.db('exercise');

    // create new collection 'greetings'
    const r = await db.collection('greetings').insertOne(req.body);
    assert.equal(1, r.insertedCount); // r.isertedCount - to validate that database received our document and added it to the colelction

    res.status(201).json({ status: 201, data: req.body });

  } catch (err) {

    res.status(500).json({ status: 500, data: req.body, message: err.message });
  }

  client.close();
};

const getGreeting = async (req, res) => {
  const { _id } = req.params;

  const client = new MongoClient('mongodb://localhost:27017', {
    useUnifiedTopology: true,
  });

  await client.connect();
  const db = client.db('exercise');

  db.collection('greetings').findOne({ _id: _id.toUpperCase() }, (err, result) => {
    result
      ? res.status(200).json({ status: 200, _id, data: result })
      : res.status(404).json({ status: 404, _id, data: 'Not Found' });
    client.close();
  });

  // res.status(200).json('bacon');
};

const getGreetings = async (req, res) => {

  const client = new MongoClient('mongodb://localhost:27017', {
    useUnifiedTopology: true,
  });

  console.log('hello');
  await client.connect();
  console.log('hello again');

  const db = client.db('exercise');

  db.collection('greetings')
    .find()  //get back _all_ fo the doc in the 'two' collection
    .toArray((err, result) => {
      if (result.length) {
        console.log(result.length);
        const start = Number(req.query.start) || 0;
        const cleanStart = start > -1 && start < result.length ? start : 0;
        const end = cleanStart + (Number(req.query.limit) || 25);
        const cleanEnd = end > result.length ? result.length - 1 : end;
        const data = result.slice(cleanStart, cleanEnd);
        res.status(200).json({ status: 200, data });
      } else {
        res.status(404).json({ status: 404, data: 'Not Found' });
      }
      client.close();
    })
};

const deleteGreeting = async (req, res) => {
  const client = new MongoClient('mongodb://localhost:27017', {
    useUnifiedTopology: true,
  });
  try {
    await client.connect();

    const db = client.db('exercise');

    const r = await db.collection('greetings').deleteOne(req.body);
    assert.equal(1, r.deletedCount)
    res.status(204).json({ status: 204, _id });
  } catch (err) {
    console.log(err);
    console.log(err.stack);
    res.status(500).json({ status: 500, data: req.body, message: err.message });
  }

  client.close();
}

const updateGreeting = async (req, res) => {
  const { _id } = req.params;

  if (!hello) {
    res.status(400).json({ status: 400, data: req.body, message: 'Only "hello may be updated.', });
    return;
  }
  // $set expects the user to pass JSON in the body of the query
  // { "hello": "Salut"}
  const client = new MongoClient('mongodb://localhost:27017', {
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    const db = client.db('exercise');

    const query = { _id };
    const newValues = { $set: { ...req.body } };

    //.updateOne() takes 2 objects as arguments
    const r = await db.collection('greetings').updateOne(query, newValues);
    assert.equal(1, r.matchedCount);
    assert.equal(1, r.modifiedCount);

    res.status(200).json({ status: 200, _id });
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ status: 500, message: 'err' });
  }
  // const db = client.db('exercise');

  // res.status(200).json({ status: 200, _id, data: req.body });

}


module.exports =
{
  createGreeting,
  getGreeting,
  getGreetings,
  deleteGreeting,
  updateGreeting,
};