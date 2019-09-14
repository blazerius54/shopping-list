const http = require("http");
const express = require("express");
const mongoose = require("mongoose");
const config = require("./config");
const test = require("./models/Products");
const cors = require("cors");
const socket = require("socket.io");
const ProductsModel = test.ProductsModel;
const ShoppingListModel = require('./models/ShoppingList');
const SOCKET = require("../global/consts/socket");

const app = express();
app.use(cors());

const server = http.createServer(app);
const port = 5000;
const io = socket(server);
const db = mongoose.connection;


app.use(express.json());
app.use("/lists", require("./routes/lists"));
app.use("/products", require("./routes/products"));


const getShoppingLists = () => {
  ShoppingListModel
      .find({})
      .populate("items.product", "-__v")
      .then((shoppingLists) => {
        io.emit(SOCKET.GET_SHOPPING_LIST, shoppingLists);
      });
};

const getProducts = () => {
  ProductsModel
      .find({})
      .then((products) => {
        io.emit(SOCKET.GET_PRODUCTS, products);
      });
};

const addNewProduct = (info) => {
  // const newProduct

  const newItem = new ProductsModel({
    name: info
  });

  newItem.save().then(() => {
    ProductsModel
        .find({})
        .then((products) => {
          io.emit(SOCKET.GET_PRODUCTS, products);
        });
  });
};

const result = () => {
  getShoppingLists();
  getProducts();
};

// socket setup
io.on("connection", (socket) => {
  console.log("user have connected", socket.id);
  io.on("disconnect", () => {
    console.log("user have disconnected")
  });

  socket.on(SOCKET.GET_INITIAL_DATA, result);

  socket.on(SOCKET.DELETE_SHOPPING_LIST, (id) => {
    ShoppingListModel
        .findById(id)
        .then(item => {
          item.remove()
              .then(() => getShoppingList())
        });
  });

  socket.on(SOCKET.ADD_NEW_PRODUCT, addNewProduct);
});

server.listen(port, () => console.log(`Server started on port ${port}`, config.mongoURI));
// app.listen(port, () => console.log(`Server started on port ${port}`, config.mongoURI));

mongoose.connect(
    config.mongoURI,
    {useNewUrlParser: true}
);

db.once("open", () => console.log("mongo is running"));
