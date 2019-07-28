const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    }
  },
);

module.exports = {
  ProductsModel: mongoose.model('shopping-items', ProductsSchema),
  ProductsSchema,
};
