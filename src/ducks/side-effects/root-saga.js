import { all } from 'redux-saga/effects';
import { userSaga } from './user/';

// Single entry point to start all Sagas at once
export default function* rootSaga(context) {
    yield all([
        userSaga(context)
    ]);
}
