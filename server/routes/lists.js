const ShoppingListModel = require('../models/ShoppingList');
const express = require('express');
const router = express.Router();

router.post("/new", (req, res) => {
  console.log(req.body);

  const date = new Date();
  const newList = new ShoppingListModel({
    date: `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`,
    items: [{
      product: {
        _id: req.body.productId,
      },
      amountType: req.body.amount,
      amount: req.body.amount,
    }]
  });

  newList.save().then(item => res.json(item));
});

router.get("/all", (req, res) => {
  ShoppingListModel.find({}, "-_id")
      .populate("items.product", "-_id")
      .then(items => res.json(items));
});

module.exports = router;
