import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
// import './css/bootstrap.min.css';
// import './css/all.css';
// import * as serviceWorker from './serviceWorker';


// let localStorageVals = {
//   isLoggedIn: false,
//   token: '',
//   userInfo: null
// };

let localStorageVals = null;

if (localStorage.getItem('token')) {
  localStorageVals = {
    isLoggedIn: true,
    token: localStorage.getItem('token'),
    userInfo: JSON.parse(localStorage.getItem('userInfo')),
  }
}

ReactDOM.render(
  <BrowserRouter>
    <App userProps={localStorageVals} />
  </BrowserRouter>,
  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
