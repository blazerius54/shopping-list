const ShoppingList = require('../models/ShoppingList');
const express = require('express');
const router = express.Router();

router.get("/all", (req, res) => {
  ShoppingList.find({}, "-_id")
      .populate("items.product", "-_id")
      .then(items => res.json(items));
});

module.exports = router;
