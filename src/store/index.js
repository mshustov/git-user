import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootSaga from '../ducks/side-effects/root-saga';
import user from '../ducks/pure/user/';
import api from '../utils/api';

export default function configureStore({ initialState } = {}) {
    const sagaMiddleware = createSagaMiddleware();
    const middlewares = compose(
        applyMiddleware(sagaMiddleware),
        (
            typeof window !== 'undefined' &&
            typeof window.devToolsExtension !== 'undefined'
        ) ?
            window.devToolsExtension() :
            f => f
    );

    const rootReducer = combineReducers({
        user
    });

    const store = createStore(
        rootReducer,
        initialState,
        middlewares
    );

    const context = { api };

    sagaMiddleware.run(rootSaga, context);

    return store;
}
