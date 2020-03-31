import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import {useStyles, ControlsWrapper} from "./styles";

const ShoppingListItem = ({product, handleProductInfoChange, index}) => {
  const changeProductType = (event) => {
    handleProductInfoChange(index, "amountType", event.target.value);
  };

  const handleAmountChange = (event, value) => {
    handleProductInfoChange(index, "amount", event.target.value);
  };

  const classes = useStyles();
  return (
    <ListItem key={product.name} button>
      <ListItemText className={classes.inputLabel} primary={product.name}/>
      <ControlsWrapper>
        <TextField
          id="standard-number"
          label="количество"
          onChange={handleAmountChange}
          type="number"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          margin="normal"
        />
        <FormControl
          className={classes.select}
        >
          <Select
            value={product.amountType || "шт"}
            onChange={changeProductType}
          >
            <MenuItem value={"шт"}>шт</MenuItem>
            <MenuItem value={"кг"}>кг</MenuItem>
          </Select>
        </FormControl>
      </ControlsWrapper>
    </ListItem>
  )
};

export default ShoppingListItem;
