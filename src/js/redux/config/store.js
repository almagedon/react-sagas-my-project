import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux/dev/logger';

import rootSaga from 'redux/sagas';
import rootReducer from 'redux/reducers';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

const IS_PRODUCTION = process.env.NODE_ENV === 'production';

let initialState = {};

// Creating store
// Remove "serverSagas" and "sagaOptions" params
// if you are not using server rendering
export default () => {
  let store = null;
  let middleware = null;

  const sagaMiddleware = createSagaMiddleware();

  if (IS_PRODUCTION) {
    // In production we are adding only sagas middleware
    middleware = applyMiddleware(sagaMiddleware);
  } else {
    // In development mode beside sagaMiddleware
    // logger and DevTools are added
    middleware = applyMiddleware(sagaMiddleware, logger);

    // Enable DevTools if browser extension is installed
    if (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__) { // eslint-disable-line
      middleware = compose(
        middleware,
        window.__REDUX_DEVTOOLS_EXTENSION__() // eslint-disable-line
      );
    }
  }
  const persistConfig = {
    key: 'root',
    storage: storage,
    blacklist: ['app'],
  };
  const pReducer = persistReducer(persistConfig, rootReducer);

  // Create store
  // with initial state if it exists
    //rootReducer,
  store = createStore(
    pReducer,
    initialState,
    middleware
  );

  // Run root saga
  sagaMiddleware.run(rootSaga);

  // Enable Webpack hot module replacement for reducers
  /*if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers/index').default; // eslint-disable-line global-require
      store.replaceReducer(nextRootReducer);
    });
  }*/

  // Return store only
  // But as an object for consistency
  return {
    store,
  };
};
