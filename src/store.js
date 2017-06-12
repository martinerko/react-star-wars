import { createStore, compose, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import thunk from 'redux-thunk';

import { FIREBASE_CONFIG } from './constants/config';
import reducers from './reducers';

const configureStore = (history, initialState) => {
  const middleware = [
    thunk.withExtraArgument(getFirebase),
    routerMiddleware(history)
  ];

  let devTools = [];
  if (typeof window === 'object' && typeof window.devToolsExtension !== 'undefined') {
    devTools = [window.devToolsExtension()];
  }

  const store = createStore(
    reducers,
    initialState,
    compose(
      applyMiddleware(...middleware),
      reactReduxFirebase(FIREBASE_CONFIG,
        {
          userProfile: 'users',
          enableLogging: false
        }
      ),
      ...devTools
    )
  );
  return store;
};

export default configureStore;
