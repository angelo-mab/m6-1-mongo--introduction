'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const PORT = process.env.PORT || 8000;

const { getCollection } = require('./exercises/exercise-1-2');
const {
  createGreeting,
  getGreeting,
  getGreetings,
  deleteGreeting,
  updateGreeting,
} = require('./exercises/exercise-2.1');

express()
  .use(morgan('tiny'))
  .use(express.static('public'))
  .use(bodyParser.json())
  .use(express.urlencoded({ extended: false }))
  .use('/', express.static(__dirname + '/'))

  // exercise 1
  .get('/ex-1/:dbName/:collection', getCollection) // 2 params are dbName and collection that will be passed on to getCollection

  // exercise 2
  .post('/ex-2/greeting', createGreeting)
  .get('/ex-2/greeting/:_id', getGreeting)
  .get('/ex-2/greeting', getGreetings)
  .delete('/ex-2/greeting/:_id', deleteGreeting)
  .put('/ex-2/greeting/:_id', updateGreeting)

  // handle 404s
  .use((req, res) => res.status(404).type('txt').send('🤷‍♂️'))

  .listen(PORT, () => console.log(`Listening on port ${PORT}`));
