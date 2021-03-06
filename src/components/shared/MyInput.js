import styled from "styled-components";
import { TextField } from "@material-ui/core";

const MyInput = styled(TextField)`
  background-color: white;
  border-radius: 10px;

  width: 100%;
  max-width: 450px;

  &::placeholder {
    color: red;
    opacity: 1; /* Firefox */
  }
`;

export default MyInput;
