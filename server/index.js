const http = require("http");
const app = require("express")();
const mongoose = require("mongoose");
const config = require("./config");
const test = require("./models/Products");
const cors = require("cors");
const socket = require("socket.io");
const ProductsModel = test.ProductsModel;
const ShoppingListModel = require('./models/ShoppingList');
const server = http.createServer(app);

const port = 5000;
const io = socket(server);
const db = mongoose.connection;

app.use(cors());

const getProducts = () => {
  ProductsModel.find({})
    .then((products) => {
      io.emit("get_data", products);
    })
};

// socket setup
io.on("connection", (socket) => {
  console.log("user have connected", socket.id);
  io.on("disconnect", () => {
    console.log("user have disconnected")
  });

  socket.on("initial_data", getProducts);

  socket.on("delete_item", (id) => {
    ProductsModel
      .findById(id)
      .then(item => {
        item.remove()
            .then(() => getProducts())
      })
  })
});

server.listen(port, () => console.log(`Server started on port ${port}`, config.mongoURI));

mongoose.connect(
    config.mongoURI,
    {useNewUrlParser: true}
);

db.once("open", () => console.log("mongo is running"));
