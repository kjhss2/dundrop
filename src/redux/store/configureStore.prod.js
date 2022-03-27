import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

/* Components */
import rootReducer from '../reducers';
import App from '../../App';

const store = createStore(rootReducer, applyMiddleware());

export default function ProdStore() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
}