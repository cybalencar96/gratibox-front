import ReactDOM from 'react-dom'
import App from './App'
import { Typography, CssBaseline } from '@material-ui/core';

ReactDOM.render(
    <Typography>
        <CssBaseline />
        <App />        
    </Typography>
, document.querySelector('.root'))