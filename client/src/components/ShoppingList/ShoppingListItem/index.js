import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {useStyles} from "./styles";

const ShoppingListItem = ({product, handleProductTypeChange, index}) => {
  const handleChange = (event) => {
    console.log(event.target.value)
    handleProductTypeChange(index, event.target.value);
  };

  const classes = useStyles();
  return (
    <ListItem key={product.name} button>
      <ListItemText className={classes.inputLabel} primary={product.name}/>
      <FormControl>
        <Select
          value={product.type || "шт"}
          onChange={handleChange}
          inputProps={{
            name: 'age',
            id: 'age-simple',
          }}
        >
          <MenuItem value={"шт"}>шт</MenuItem>
          <MenuItem value={"кг"}>кг</MenuItem>
        </Select>
      </FormControl>
    </ListItem>
  )
};

export default ShoppingListItem;
