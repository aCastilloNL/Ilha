import { combineReducers, applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import plansReducer from './reducers/PlansReducer';
import authenticationReducer from './reducers/AuthReducer';

const createRootReducer = () =>
  combineReducers({
    authentication: authenticationReducer,
    plansReducer: plansReducer,
  });

export default function makeStore(initialState) {
  let composeEnhancers = compose;
  const middlewares = [thunk];

  if (process.env.NODE_ENV === 'development') {
    if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
      composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
    }
  }

  const store = createStore(
    createRootReducer(),
    initialState,
    composeEnhancers(applyMiddleware(...middlewares))
  );

  if (module.hot) {
    module.hot.accept('./reducers/AuthReducer', () => {
      const nextReducer = require('./reducers/AuthReducer').default;
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}

