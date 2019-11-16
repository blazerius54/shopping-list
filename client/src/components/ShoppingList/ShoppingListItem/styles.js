import {makeStyles} from "@material-ui/core";
import styled from "styled-components";

export const ControlsWrapper = styled.div`
  display: flex;
`;

export const useStyles = makeStyles(theme => ({
  itemWrapper: {
    display: "flex",
  },
  inputLabel: {
    alignSelf: "stretch",
    display: "flex",
    alignItems: "flex-end",
    flex: "0 0 60%",
  },
  textField: {
    marginBottom: 0,
  },
  select: {
    alignSelf: "flex-end",
    flex: "0 0 40%",
  }
}));
