import styled from 'styled-components';
import { Button } from '@material-ui/core';

const MyButton = styled(Button)`
  border-radius: 10px !important;

  width: ${(props) => (props.autoWidth ? 'auto' : '80%')};
  max-width: ${(props) => (props.autoWidth ? '' : '300px')};
`;

export default MyButton;
