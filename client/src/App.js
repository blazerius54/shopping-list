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

const App = () => {
  const [shoppingLists, setShoppingLists] = useState([]);
  const [fetchedProducts, setFetchedProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({name: "", type: "шт"});
  const [productsInList, setProductsInList] = useState([]);

  const handleProductOnChange = (e) => {
    const {value} = e.target;
    console.log(newProduct)
    setNewProduct({...newProduct, name: value});
    setTimeout(() => searchProducts(value), 100);
  };

  const addNewProduct = () => {
    io.emit(SOCKET.ADD_NEW_PRODUCT, newProduct.name);
    setNewProduct("");
    searchProducts("");
  };

  const addProductInList = () => {
    if(!newProduct || productsInList.includes(newProduct)) {
      return
    }

    if (fetchedProducts.some(item => item.name === newProduct.name)) {
      setProductsInList(prevProducts => [...prevProducts, newProduct]);
    } else {
      addNewProduct();
    }

    setNewProduct({name: "", type: "шт"})
  };

  const setProductInInput = (product)=> () => {
    setNewProduct({...product, type: "шт"});
  };

  const handleProductTypeChange = (index, prop, val) => {
    const newProducts = [
      ...productsInList.slice(0, index),
      {
        ...productsInList[index],
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
    setFetchedProducts(products);
  };

  const deleteShoppingList = id => {
    io.emit(SOCKET.DELETE_SHOPPING_LIST, id);
  };

  const fetchInitialData = () => {
    io.emit(SOCKET.GET_INITIAL_DATA);
  };

  const searchProducts = (product) => {
    io.emit(SOCKET.SEARCH_PRODUCTS, product);
  };

  const getNewProduct = newProduct => {
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
        {fetchedProducts.length > 0 && newProduct.name.length > 0 && (
          <List component="ul" className={classes.root}>
            {fetchedProducts.map((product) => (
              <ListItem key={product._id} button onClick={setProductInInput(product)}>
                <ListItemText primary={product.name}/>
              </ListItem>
            ))}
          </List>
        )}
      </ListsWrapper>

      {productsInList.length > 0 && (
        <ShoppingList
          productsInList={productsInList}
          handleProductTypeChange={handleProductTypeChange}
          saveNewProductList={()=>console.log(productsInList)}
        />
      )}
    </MainWrapper>
  )
};

export default App;
