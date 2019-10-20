import {makeStyles} from "@material-ui/core";

export const useStyles = makeStyles(theme => ({
  inputLabel: {
    alignSelf: "stretch",
    display: "flex",
    alignItems: "flex-end",
  },
  textField: {
    marginBottom: 0,
  },
  select: {
    alignSelf: "flex-end",
  }
}));