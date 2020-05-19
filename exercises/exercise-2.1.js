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

    // declare db - 'exercise-two' as database
    const db = client.db('exercise-two');

    // create new collection 'greetings'
    const r = await db.collection('greetings').insertOne(req.body);
    assert.equal(1, r.insertedCount);
    // r.insertedCount - to validate that database received our document and added it to the collection

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
  const db = client.db('exercises');

  db.collection('two').findOne({ _id: _id.toUpperCase() }, (err, result) => {
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

  const db = client.db('exercises');

  db.collection('two')
    .find()  //get back _all_ of the doc in the 'two' collection
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
      // res.status(200).json({ status: 200, data: result });
      client.close();
    })

  /* 
  Note:
  Using .find() without passing anything to it will return _all_ the documents in the collection
  
  It isn't good practive to return _all_ of the data.
    What would happen if there are thousands of document in the collection?

    Instead we set up some limits
  */
};

const deleteGreeting = async (req, res) => {
  const { _id } = req.params;

  const client = new MongoClient('mongodb://localhost:27017', {
    useUnifiedTopology: true,
  });
  try {
    await client.connect();

    const db = client.db('exercises');

    const r = await db.collection('two').deleteOne({ _id: _id.toUpperCase() });
    assert.equal(1, r.deletedCount);
    //deleteCount interesting....
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
  const { hello } = req.body; // takes the 

  if (!hello) {
    res.status(400).json({
      status: 400,
      data: req.body,
      message: 'Only "hello may be updated.',
    });
    return;
  }
  // $set expects the user to pass JSON in the body of the query
  // { "hello": "Salut"}
  const client = new MongoClient('mongodb://localhost:27017', {
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    const db = client.db('exercises');

    const query = { _id };
    const newValues = { $set: { hello } };

    //.updateOne() takes 2 objects as arguments
    const r = await db.collection('two').updateOne(query, newValues);
    assert.equal(1, r.matchedCount);
    assert.equal(1, r.modifiedCount);

    res.status(200).json({ status: 200, _id });
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ status: 500, message: 'err' });
  }
  client.close();

  // res.status(200).json({ status: 200, _id, data: req.body });
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