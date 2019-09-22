import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import { ShoppingListWrapper } from "./styles";

const ShoppingList = ({ productsForList }) => (
  <ShoppingListWrapper>
    <List disablePadding>
      <h2>List</h2>
      {productsForList.length > 0 &&
        productsForList.map(product => (
          <ListItem key={product} button>
            <ListItemText primary={product} />
          </ListItem>
        ))}
    </List>
  </ShoppingListWrapper>
);

export default ShoppingList;
