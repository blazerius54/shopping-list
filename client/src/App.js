import React, {useState, useEffect} from 'react';
import socketIOClient from "socket.io-client";

const socket = socketIOClient.connect("http://localhost:5000");
const App = () => {
  const [products, setProducts] = useState([]);

  const getData = (data) => {
    setProducts(data)
  };

  const deleteProduct = id => {
    socket.emit("delete_item", id);
  };

  const fetchProducts = () => {
    socket.emit("initial_data");
  };

  useEffect(() => {
    fetchProducts();
    socket.on("get_data", getData);

    return () => {
      socket.off("get_data");
    }
  }, []);

  return (
      <>
        It`s your app
        <button onClick={fetchProducts}>fetchProducts</button>
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
