import styled from "styled-components";
import {makeStyles} from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.default,
    maxHeight: "330px",
    overflow: "hidden",
  },

  input: {
    alignSelf: "flex-start",
  }
}));

export const MainWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 700px;
`;

export const ItemWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const ControlsWrapper = styled.div`
  display: flex;
  width: 300px;
`;

export const ListsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  //& > * {
  //  align-self: flex-start;
  //  flex: 1 0 30%;
  //}
`;