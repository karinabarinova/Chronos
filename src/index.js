import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import App from './App';
import authReducer from './store/reducers/auth';
import reportWebVitals from './reportWebVitals';

const composeEnchancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootReducer = combineReducers({
  auth: authReducer
})
const store = createStore(rootReducer, composeEnchancers(applyMiddleware(thunk)));

axios.defaults.baseURL = 'http://localhost:3001/api';

axios.interceptors.request.use(req => {
	console.log(req);
  	return req;
}, error => {
	  console.log(error);
	  return Promise.reject(error);
})

axios.interceptors.response.use(req => {
	console.log(req);
	return req;
}, error => {
	console.log(error);
	return Promise.reject(error);
})

ReactDOM.render(
  <Provider store={store}>
      <React.StrictMode>
          <App />
      </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
