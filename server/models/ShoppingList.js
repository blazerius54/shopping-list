const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ShoppingModel = require('../models/ShoppingItem');

const ShoppingListSchema = new Schema({
  _id: Schema.Types.ObjectId,
  date: {
    type: String,
    required: true,
  },
  items: [{
    product: {
      type: Schema.Types.ObjectId,
      ref: 'shopping-items'
    },
    amountType: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    }
  }]
});

module.exports = mongoose.model('shopping-lists', ShoppingListSchema);
