import React, {useState, useEffect} from 'react';
import socketIOClient from "socket.io-client";
import {MainWrapper, ItemWrapper, ControllsWrapper} from "./styles";
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';


const SOCKET = require("../../global/consts/socket");

const io = socketIOClient.connect("http://localhost:5000");
function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}
const App = () => {
  const [shoppingLists, setShoppingLists] = useState([]);
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState("");

  const handleProductOnChange = (e) => {
    const {value} = e.target;
    setNewProduct(value);
    setTimeout(() => searchProducts(value), 100);
  };

  const getListData = (lists) => {
    setShoppingLists(lists);
  };

  const getProductsData = (products) => {
    setProducts(products);
  };

  const deleteShoppingList = id => {
    io.emit(SOCKET.DELETE_SHOPPING_LIST, id);
  };

  const fetchInitialData = () => {
    io.emit(SOCKET.GET_INITIAL_DATA);
  };

  const addNewProduct = () => {
    io.emit(SOCKET.ADD_NEW_PRODUCT, newProduct);
    setNewProduct("");
    searchProducts("");
  };

  const searchProducts = (product) => {
    io.emit(SOCKET.SEARCH_PRODUCTS, product);
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
          value={newProduct}
          inputProps={{
            'aria-label': 'description',
          }}
          onChange={handleProductOnChange}
        />
        <Button color="primary" onClick={addNewProduct}>
          Добавить
        </Button>
      </ControllsWrapper>
      {/*{*/}
      {/*  shoppingLists.length > 0 && (*/}
      {/*    shoppingLists.map(({name, _id, date, items}) => (*/}
      {/*      <ItemWrapper key={_id} style={{display: "flex"}}>*/}
      {/*        <p>{date}</p>*/}
      {/*        <ul>*/}
      {/*          {*/}
      {/*            items.map(({product, _id}) => (*/}
      {/*              <li key={_id}>{product.name}</li>*/}
      {/*            ))*/}
      {/*          }*/}
      {/*        </ul>*/}
      {/*        <button onClick={() => deleteShoppingList(_id)}>delete</button>*/}
      {/*      </ItemWrapper>*/}
      {/*    ))*/}
      {/*  )*/}
      {/*}*/}


      <List component="nav" aria-label="secondary mailbox folders">
        {
          products.length > 0 && (
            products.map(({name, _id}) => (
              <ListItem key={_id} button onClick={() => setNewProduct(name)}>
                <ListItemText primary={name} />
              </ListItem>
            ))
          )
        }
      </List>

    </MainWrapper>
  )
};

export default App;
