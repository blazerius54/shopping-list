const express = require("express");
const mongoose = require("mongoose");
const config = require("./config");
const test = require("./models/Products");
const cors = require("cors");
const socket = require("socket.io");
const ProductsModel = test.ProductsModel;

const app = express();
const port = 5000;
const db = mongoose.connection;

app.use(express.json());
app.use(cors());
app.use("/lists", require("./routes/lists"));
app.use("/products", require("./routes/products"));

// socket setup
const io = socket(5050);
io.on("connection", (socket) => {
  console.log('SOCKET', socket.id);
});


app.listen(port, ()=>console.log(`Server started on port ${port}`, config.mongoURI));

mongoose.connect(
  config.mongoURI,
  { useNewUrlParser: true }
);

db.once("open", () => console.log("mongo is running"));
