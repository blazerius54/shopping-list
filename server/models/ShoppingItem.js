const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ShoppingItemSchema = new Schema({
  name: {
    type: String,
    required: true,
  }
});

module.exports = {
  ShoppingItem: mongoose.model('shopping-items', ShoppingItemSchema),
  ShoppingItemSchema,
};
