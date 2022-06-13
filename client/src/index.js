import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers'
import App from './components/App';
import 'materialize-css/dist/css/materialize.min.css';


// createStore takes
// 1 - a list of all our reducers
// 2 - a state or predefined state
// 3 - applyMiddleware() to invoke the middlewares that we might use
const store = createStore( reducers, {}, applyMiddleware(reduxThunk))

ReactDOM.render(
  <Provider store = {store}>
    <App/>
  </Provider>,
  document.querySelector('#root')
);
