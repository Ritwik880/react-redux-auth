import ReactDOM from 'react-dom';
// import { PersistGate } from 'redux-persist/integration/react';
import { applyMiddleware, createStore, Middleware } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
// import { persistStore } from 'redux-persist';
import rootReducer from './reducers';
import App from './App';

// const thunkMiddleware: Middleware<{}, any, ThunkDispatch<any, any, any>> = (store) => (next) => (action) =>
//   typeof action === 'function' ? action(store.dispatch, store.getState) : next(action);

// const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
// const persistor = persistStore(store);

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
