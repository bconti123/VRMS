import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import './tailwind.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { SnackbarProvider } from './context/snackbarContext';

ReactDOM.render(
  <BrowserRouter>
    <SnackbarProvider>
      <App />
    </SnackbarProvider>
  </BrowserRouter>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
