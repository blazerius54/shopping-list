const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ShoppingModel = require('./Products');

const ShoppingListSchema = new Schema({
  date: {
    type: String,
    required: true,
  },
  items: [{
    product: {
      type: Schema.Types.ObjectId,
      ref: 'shopping-items'
    },
    name: {
      type: String,
      required: true,
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
