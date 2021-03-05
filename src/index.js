import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import authReducer from './store/reducers/auth';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
	auth: authReducer
})

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

axios.defaults.baseURL = 'http://localhost:3001/api';

// axios.interceptors.request.use(req => {
// 	console.log(req);
//   	return req;
// }, error => {
// 	  console.log(error);
// 	  return Promise.reject(error);
// })

// axios.interceptors.response.use(req => {
// 	console.log(req);
// 	return req;
// }, error => {
// 	console.log(error);
// 	return Promise.reject(error);
// })

ReactDOM.render(
	<Provider store={store}>
		<React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
		</React.StrictMode>
	</Provider>,
  	document.getElementById('root')
);

reportWebVitals();
