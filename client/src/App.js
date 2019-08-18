import React, { useState, useEffect } from 'react';
import socketIOClient from "socket.io-client";

const socket = socketIOClient.connect("http://localhost:5050");
const App = () => {
  const [products, setProducts] = useState([]);
  // const fetchProducts = () => {
  //   return fetch("http://localhost:5000/products/all")
  //       .then(items => items.json())
  //       .then(result => setProducts(result))
  // };


  // useEffect(() => {
  //   console.log('mnt')
  //
  //   socket.emit("initial_data");
  //   socket.on("get_data", getData);
  // });

  const getData = (data) => {
    console.log("data", data);
    // socket.emit("getProducts");
    setProducts(data)
  };

  const deleteProduct = id => {
    console.log(id)
    socket.emit("delete_item", id);
    socket.on("get_data", getData);
  }

  const foo = () => {
    socket.emit("initial_data");
    socket.on("get_data", getData);
  };

  return (
      <>
        It`s your app
        {/*<button onClick={fetchProducts}>click</button>*/}
        <button onClick={foo}>foo</button>
        {/*<button onClick={()=>socket.connect("http://localhost:5050")}>connect socket</button>*/}
        {/*<button onClick={()=>socket.on("getProducts")}>get lists</button>*/}
        {/*<button onClick={()=>socketIOClient.disconnect()}>disconnect socket</button>*/}
        {
          products.length > 0 && (
              products.map(({name, _id}, index) => (
                  <div key={index} style={{display: "flex"}}>
                    <p>{name}</p>
                    <button onClick={() => deleteProduct(_id)}>delete</button>
                  </div>
              ))
          )
        }
      </>
  )
};

export default App;
