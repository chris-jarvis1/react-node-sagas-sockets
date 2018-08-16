import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/* eslint-enable */

export default function configureStore(initialState = {}) {
    const store = createStore(
        rootReducer,
        initialState,
        composeEnhancers(applyMiddleware(sagaMiddleware))
    );

    // then run the saga
    sagaMiddleware.run(rootSaga)

    return store;
}
