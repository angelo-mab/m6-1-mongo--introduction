'use strict';

// const { MongoClient } = require('mongodb');

const getCollection = async (req, res) => {
  const { dbName, collection } = req.params; // get the url params....

  //create a new client
  const client = new MongoClient('mongodb://localhost:27017', {
    useUnifiedTopology: true,
  });

  await client.connect(); // open the connetion to the database server
  const db = client.db(dbName); // declare "db" / looks for the database that we have specified from the params that was passed down

  db.collection(collection)
    .find()
    .toArray((err, data) => {
      if (err) {
        res.status(400).json({ status: 400, result: 'err!' }); // send error
      } else {
        res.status(200).json({ status: 200, result: data }); // send result
        client.close(); // close the connection to the database server
        console.log('disconnected!');
      }

    })


}

module.exports = { getCollection };