import {makeStyles} from "@material-ui/core";
import styled from "styled-components";

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
    flex: "1 0",
  }
}));

export const ControlsWrapper = styled.div`
  display: flex;
`;