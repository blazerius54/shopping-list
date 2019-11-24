import React from "react";
import List from "@material-ui/core/List";
import {ComponentWrapper, ShoppingListWrapper} from "./styles";
import ShoppingListItem from "./ShoppingListItem";
import Button from "@material-ui/core/Button";

const ShoppingList = ({productsInList, handleProductTypeChange, saveNewProductList}) => {
  return (
    <ComponentWrapper>
      <List disablePadding>
        <h2>Список покупок</h2>
        {productsInList.length > 0 && (
          <ShoppingListWrapper>
            {productsInList.map((product, index) => (
              <ShoppingListItem
                key={product._id}
                product={product}
                index={index}
                handleProductTypeChange={handleProductTypeChange}
              />
            ))}
          </ShoppingListWrapper>
        )}
      </List>
      <Button
        variant="contained"
        color="primary"
        onClick={saveNewProductList}
      >
        Сохранить
      </Button>
    </ComponentWrapper>
  )
};

export default ShoppingList;
