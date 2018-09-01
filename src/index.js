import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';

import { AppContainer } from 'react-hot-loader';
import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import configureStore from 'redux/config/store';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { persistStore } from 'redux-persist';
import App from 'views/App';
import 'index.css';

const renderMethod= ReactDOM.render;

const store = configureStore().store;
const persistor = persistStore(store);

const render = RootComponent => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={ store }>
          <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter>
              <RootComponent />
            </BrowserRouter>
          </PersistGate>
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  );
}

render(App);

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('views/App', () => {
    console.log('Accepting the updated printMe module!')
    render(App);
  });
}