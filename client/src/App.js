import React, {useState, useEffect} from 'react';
import socketIOClient from "socket.io-client";
import { MainWrapper, ItemWrapper, ControllsWrapper } from "./styles";
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

const socket = socketIOClient.connect("http://localhost:5000");

const App = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState("");

  const handleProductOnChange = (e) => {
    setNewProduct(e.target.value);
  };

  const getData = (data) => {
    setProducts(data);
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
      <MainWrapper>
        It`s your app
        <button onClick={fetchProducts}>fetchProducts</button>
        <ControllsWrapper>
          <Input
              defaultValue={newProduct}
              inputProps={{
                'aria-label': 'description',
              }}
              onChange={handleProductOnChange}
          />
          <Button color="primary">
            Добавить
          </Button>
        </ControllsWrapper>
        {
          products.length > 0 && (
              products.map(({name, _id, date, items}, index) => (
                  <ItemWrapper key={index} style={{display: "flex"}}>
                    <p>{date}</p>
                    <ul>
                      {
                        items.map(({product, _id}) => (
                          <li key={_id}>{product.name}</li>
                        ))
                      }
                    </ul>
                    <button onClick={() => deleteProduct(_id)}>delete</button>
                  </ItemWrapper>
              ))
          )
        }
      </MainWrapper>
  )
};

export default App;
