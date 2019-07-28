const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const test = require("../models/ShoppingItem");
const ShoppingItem = test.ShoppingItem;
const Schema = mongoose.Schema;

router.get("/all", (req, res) => {
  ShoppingItem.find({}, "-_id")
      .then(items => res.json(items));
});

router.post("/new", (req, res) => {
  const newItem = new ShoppingItem({
    name: req.body.name
  });

  console.log(newItem)


  newItem.save().then(item => res.json(item));
});

module.exports = router;
