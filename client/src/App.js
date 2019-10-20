import React, {useState, useEffect} from 'react';
import socketIOClient from "socket.io-client";
import {useStyles, MainWrapper, ItemWrapper, ControlsWrapper, ListsWrapper} from "./styles";
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ShoppingList from "./components/ShoppingList";

const SOCKET = require("../../global/consts/socket");

const io = socketIOClient.connect("http://localhost:5000");

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

const App = () => {
  const [shoppingLists, setShoppingLists] = useState([]);
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({name: ""});
  const [productsInList, setProductsInList] = useState([]);

  const handleProductOnChange = (e) => {
    const {value} = e.target;
    setNewProduct({name: value});
    setTimeout(() => searchProducts(value), 100);
  };

  const addProductInList = () => {
    if(!newProduct || productsInList.includes(newProduct)) {
      return
    }


    if (products.some(item => item.name === newProduct.name)) {
      setProductsInList(prevProducts => [...prevProducts, newProduct]);
    } else {
      addNewProduct();
    }
  };

  const handleProductTypeChange = (index, prop, val) => {
    const newProducts = [
      ...productsInList.slice(0, index),
      {
        ...productsInList[index],
        // name: productsInList[index].name,
        // amount: productsInList[index].amount,
        [prop]: val,

      },
      ...productsInList.slice(index + 1)
    ];
    setProductsInList(newProducts);
  };

  const getListData = (lists) => {
    setShoppingLists(lists);
  };

  const getProductsData = (products) => {
    console.log(products)
    setProducts(products);
  };

  const deleteShoppingList = id => {
    io.emit(SOCKET.DELETE_SHOPPING_LIST, id);
  };

  const fetchInitialData = () => {
    io.emit(SOCKET.GET_INITIAL_DATA);
  };

  const addNewProduct = () => {
    io.emit(SOCKET.ADD_NEW_PRODUCT, newProduct.name);
    setNewProduct("");
    searchProducts("");
  };

  const searchProducts = (product) => {
    io.emit(SOCKET.SEARCH_PRODUCTS, product);
  };

  const getNewProduct = newProduct => {
    console.log(newProduct);

    const product = {
      name: newProduct.name,
      type: "кг",
      amount: 0,
      _id: newProduct.id,
    };

    setProductsInList(prevProducts => [...prevProducts, product]);
  };

  useEffect(() => {
    fetchInitialData();
    io.on(SOCKET.GET_SHOPPING_LIST, getListData);
    io.on(SOCKET.GET_PRODUCTS, getProductsData);
    io.on(SOCKET.GET_NEW_PRODUCT, getNewProduct);

    return () => {
      io.off(SOCKET.GET_SHOPPING_LIST);
    }
  }, []);

  const classes = useStyles();

  return (
    <MainWrapper>
      <ListsWrapper>
        <ControlsWrapper>
          <Input
            value={newProduct.name}
            inputProps={{
              'aria-label': 'description',
            }}
            className={classes.input}
            onChange={handleProductOnChange}
          />
          {/*<Button color="primary" onClick={addNewProduct}>*/}
          {/*  Добавить*/}
          {/*</Button>*/}
          <Button color="primary" onClick={addProductInList}>
            Добавить
          </Button>
        </ControlsWrapper>
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
        {products.length > 0 && (
          <List component="ul" className={classes.root}>
            {products.map((product) => (
              <ListItem key={product._id} button onClick={() => setNewProduct(product)}>
                <ListItemText primary={product.name}/>
              </ListItem>
            ))}
          </List>
        )}
      </ListsWrapper>

      <ShoppingList productsInList={productsInList} handleProductTypeChange={handleProductTypeChange}/>
    </MainWrapper>
  )
};

export default App;
