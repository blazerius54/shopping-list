const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');

const app = express();
const port = 5000;

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(port, ()=>console.log(`Server starterd on port ${port}`, config.mongoURI));

mongoose.connect(
  config.mongoURI, 
  { useNewUrlParser: true }
);

const db = mongoose.connection;
db.once('open', () => console.log('mongo is running',));
