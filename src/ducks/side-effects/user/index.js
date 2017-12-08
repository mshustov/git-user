import { delay } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';

import {
    reposPending,
    reposReceived,
    reposFetchFailed,
    saveUsername,
    resetUser
} from '../../pure/user/';

const USER_UPDATE_REQUESTED = 'USER_UPDATE_REQUESTED';

// ----------------------------------------------------------------------------
// Config
// ----------------------------------------------------------------------------

export const MIN_USER_NAME_LENGTH = 2;
export const USER_REQUEST_DELAY = 200;

// ----------------------------------------------------------------------------
// Sagas
// ----------------------------------------------------------------------------
export function* apiCaller(api, value) {
    const result = yield call(api.getRepos, value);
    return result;
}

export function* userUpdateHandler(context, action) {
    const value = action.payload;
    if (value.length < MIN_USER_NAME_LENGTH) {
        yield put(resetUser());
        return;
    }

    yield call(delay, USER_REQUEST_DELAY);
    // try {
    yield put(saveUsername(value));
    yield put(reposPending());
    // lol()
    const { api } = context;
    const repos = yield call(apiCaller, api, value);

    yield put(reposReceived(repos));
    // } catch (error) {
    //     yield put(reposFetchFailed(error));
    // }
}

export function* userUpdateSaga(context) {
    yield takeLatest(USER_UPDATE_REQUESTED, userUpdateHandler, context);
}

export function* userSaga(context) {
    yield [
        userUpdateSaga(context)
    ];
}

// ----------------------------------------------------------------------------
// Impure (with side-effect) action creators (return plain objects)
// ----------------------------------------------------------------------------

export function userUpdateRequested(value) {
    return {
        type: USER_UPDATE_REQUESTED,
        payload: value
    };
}
