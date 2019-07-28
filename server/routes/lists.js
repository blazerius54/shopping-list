const ShoppingListModel = require('../models/ShoppingList');
const express = require('express');
const router = express.Router();

router.post("/new", (req, res) => {
  const { products } = req.body;
  const date = new Date();

  const newList = new ShoppingListModel({
    date: `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`,
    items: products.map(({productId, amountType, amount}) => ({
      product: {
        _id: productId,
      },
      amountType,
      amount,
    }))
  });``

  newList.save().then(item => res.json(item));
});

router.get("/all", (req, res) => {
  ShoppingListModel.find({}, "-_id")
      .populate("items.product", "-_id")
      .then(items => res.json(items));
});

module.exports = router;
