const express = require("express");
const mongoose = require("mongoose");
const config = require("./config");
const test = require("./models/Products");
const cors = require("cors");
const socket = require("socket.io");
const ProductsModel = test.ProductsModel;
const ShoppingListModel = require('./models/ShoppingList');


const app = express();
const port = 5000;
const db = mongoose.connection;

app.use(express.json());
app.use(cors());
app.use("/lists", require("./routes/lists"));
app.use("/products", require("./routes/products"));

const getProducts = () => {
  ProductsModel.find({})
      .then((products) => {
        console.log(products)
        io.emit("get_data", products);
      })
}

// socket setup
const io = socket(5050);
io.on("connection", (socket) => {
  console.log("user have connected", socket.id);

  io.on("disconnect", () => {
    console.log("user have disconnected")
  });

  // ProductsModel.find({}, (err, products) => {
  //   io.emit("products", products);
  // });

  socket.on("initial_data", getProducts);

  socket.on("delete_item", (id) => {
    console.log(id)
    ProductsModel
        .findById(id)
        .then(item => {
          item.remove()
              .then(()=> getProducts())
          // io.emit("get_data", products);
        })
  })

});


app.listen(port, () => console.log(`Server started on port ${port}`, config.mongoURI));

mongoose.connect(
    config.mongoURI,
    {useNewUrlParser: true}
);

db.once("open", () => console.log("mongo is running"));
