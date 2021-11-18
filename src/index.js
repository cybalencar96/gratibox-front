import ReactDOM from 'react-dom'
import App from './App'
import theme from './theme';
import { CssBaseline, ThemeProvider } from '@material-ui/core';

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />    
    </ThemeProvider>    
, document.querySelector('.root'))