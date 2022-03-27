import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from '@redux-devtools/extension';

/* Components */
import rootReducer from '../reducers';
import App from '../../App';

const store = createStore(rootReducer, composeWithDevTools());

export default function DevStore() {
  return (
    <Provider store={store}>
      <React.StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </React.StrictMode>
    </Provider>
  );
}