const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');

const app = express();
const port = 5000;
const db = mongoose.connection;

app.use("/lists", require("./routes/lists"));

app.listen(port, ()=>console.log(`Server started on port ${port}`, config.mongoURI));

mongoose.connect(
  config.mongoURI,
  { useNewUrlParser: true }
);

db.once('open', () => console.log('mongo is running'));
