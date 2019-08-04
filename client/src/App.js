import React, { useState } from 'react';
// import socketIOClient from "socket.io-client";
//
// socketIOClient.connect("http://localhost:5050");

const App = () => {
  const [products, setProducts] = useState([]);
  const fetchProducts = () => {
    return fetch("http://localhost:5000/products/all")
        .then(items => items.json())
        .then(result => setProducts(result))
  };

  return (
      <>
        It`s your app
        <button onClick={fetchProducts}>click</button>
        {
          products.length > 0 && (
              products.map(({name}, index) => (
                  <div key={index} style={{display: "flex"}}>
                    <p>{name}</p>
                    <button>delete</button>
                  </div>
              ))
          )
        }
      </>
  )
};

export default App;
