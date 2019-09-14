import React, {useState, useEffect} from 'react';
import socketIOClient from "socket.io-client";
import { MainWrapper, ItemWrapper, ControllsWrapper } from "./styles";
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
const SOCKET = require("../../global/consts/socket");

const io = socketIOClient.connect("http://localhost:5000");

const App = () => {
  const [shoppingLists, setShoppingLists] = useState([]);
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState("");

  const handleProductOnChange = (e) => {
    setNewProduct(e.target.value);
  };

  const getListData = (lists) => {
    setShoppingLists(lists);
    console.log(lists);
  };

  const getProductsData = (products) => {
    setProducts(products);
    console.log(products);
  };

  const deleteShoppingList = id => {
    io.emit(SOCKET.DELETE_SHOPPING_LIST, id);
  };

  const fetchInitialData = () => {
    io.emit(SOCKET.GET_INITIAL_DATA);
  };

  const addNewProduct = () => {
    io.emit(SOCKET.ADD_NEW_PRODUCT, newProduct);
  };

  useEffect(() => {
    fetchInitialData();
    io.on(SOCKET.GET_SHOPPING_LIST, getListData);
    io.on(SOCKET.GET_PRODUCTS, getProductsData);
    return () => {
      io.off(SOCKET.GET_SHOPPING_LIST);
    }
  }, []);

  return (
      <MainWrapper>
        <ControllsWrapper>
          <Input
              defaultValue={newProduct}
              inputProps={{
                'aria-label': 'description',
              }}
              onChange={handleProductOnChange}
          />
          <Button color="primary" onClick={addNewProduct}>
            Добавить
          </Button>
        </ControllsWrapper>
        {
          shoppingLists.length > 0 && (
              shoppingLists.map(({name, _id, date, items}) => (
                  <ItemWrapper key={_id} style={{display: "flex"}}>
                    <p>{date}</p>
                    <ul>
                      {
                        items.map(({product, _id}) => (
                          <li key={_id}>{product.name}</li>
                        ))
                      }
                    </ul>
                    <button onClick={() => deleteShoppingList(_id)}>delete</button>
                  </ItemWrapper>
              ))
          )
        }

        {
          products.length > 0 && (
              products.map(({name}) => (
                  <p key={name}>{name}</p>
              ))
          )
        }
      </MainWrapper>
  )
};

export default App;
