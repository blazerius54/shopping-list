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
  const [fetchedProducts, setFetchedProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({name: "", type: "шт"});
  const [productsInList, setProductsInList] = useState([]);

  const handleProductOnChange = (e) => {
    const { value } = e.target;

    setNewProduct({ ...newProduct, name: value });
    if (value) {
      setTimeout(() => searchProducts(value), 100);
    }
  };

  const addProductInList = () => {
    const isProductInFetched = fetchedProducts.some(item => item.name === newProduct.name);
    const isProductListed = productsInList.some(item => item.name === newProduct.name);

    if (isProductListed || !newProduct.name) {
      return;
    }

    if (isProductInFetched && !isProductListed) {
      setProductsInList(prevProducts => [...prevProducts, newProduct]);
    } else if (!isProductInFetched) {
      addNewProduct();
    }
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
    console.log(lists)
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

  const addNewProduct = () => {
    io.emit(SOCKET.ADD_NEW_PRODUCT, newProduct.name);
    setNewProduct({name: "", type: "шт"});
    searchProducts("");
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

  const saveNewShoppingList = () => {
    const newShoppingList = {
      date: new Date(),
      items: [
        productsInList.map(({name, _id, type}) => ({
          name,
          _id,
          type,
        }))
      ],
    };

    console.log(shoppingLists, newShoppingList)
    io.emit(SOCKET.SAVE_NEW_PRODUCT_LIST, newShoppingList);
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
        {fetchedProducts.length > 0 && (
          <List component="ul" className={classes.root}>
            {fetchedProducts.map((product) => (
              <ListItem key={product._id} button onClick={() => setNewProduct(product)}>
                <ListItemText primary={product.name}/>
              </ListItem>
            ))}
          </List>
        )}
        <button onClick={saveNewShoppingList}>save product list</button>

      </ListsWrapper>
      <ShoppingList productsInList={productsInList} handleProductTypeChange={handleProductTypeChange}/>
    </MainWrapper>
  )
};

export default App;
