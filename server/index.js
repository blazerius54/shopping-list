const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');
const ShoppingList = require('./models/ShoppingList');
const ShoppingModel = require('./models/ShoppingItem');
const ShoppingItem = ShoppingModel.ShoppingItem;
const app = express();
const port = 5000;

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/test', (req, res) => {
  ShoppingList.find({}, "-_id")
      .populate('items.product')
      .then(items => res.json(items));
});

app.get('/test2', (req, res) => {
  ShoppingItem.find({},)
      .then(items => res.json(items));
});

app.listen(port, ()=>console.log(`Server starterd on port ${port}`, config.mongoURI));

mongoose.connect(
  config.mongoURI,
  { useNewUrlParser: true }
);

const db = mongoose.connection;
db.once('open', () => console.log('mongo is running'));
