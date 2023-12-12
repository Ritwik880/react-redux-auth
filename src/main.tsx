import { applyMiddleware, createStore, Middleware } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import rootReducer from './reducers';
import App from './App';

const thunkMiddleware: Middleware<{}, any, ThunkDispatch<any, any, any>> = store => next => action =>
  typeof action === 'function'
    ? action(store.dispatch, store.getState)
    : next(action);

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);
