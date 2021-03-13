import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme';
import makeStore from './redux/store';

const store = makeStore();


ReactDOM.render(

  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store} >
        <App />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);