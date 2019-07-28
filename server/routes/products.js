const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const test = require("../models/Products");
const ProductsModel = test.ProductsModel;
const Schema = mongoose.Schema;

router.get("/all", (req, res) => {
  ProductsModel.find({})
      .then(items => res.json(items));
});

router.post("/new", (req, res) => {
  const newItem = new ProductsModel({
    name: req.body.name
  });

  console.log(newItem)


  newItem.save().then(item => res.json(item));
});

module.exports = router;
