import React from "react";
import List from "@material-ui/core/List";
import {ShoppingListWrapper} from "./styles";
import ShoppingListItem from "./ShoppingListItem";

const ShoppingList = ({productsInList, handleProductTypeChange}) => (
  <ShoppingListWrapper>
    <List disablePadding>
      <h2>List</h2>
      {productsInList.length > 0 &&
      productsInList.map((product, index) => (
        <ShoppingListItem product={product} index={index} handleProductTypeChange={handleProductTypeChange}/>
      ))}
    </List>
  </ShoppingListWrapper>
);

export default ShoppingList;
