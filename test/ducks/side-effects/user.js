import { call, put } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { assert } from 'chai';

import {
    userUpdateHandler,
    MIN_USER_NAME_LENGTH,
    USER_REQUEST_DELAY
} from '../../../src/ducks/side-effects/user/';

import {
    reposPending,
    reposReceived,
    reposFetchFailed,
    saveUsername,
    resetUser
} from '../../../src/ducks/pure/user/';

describe('user Saga test', () => {
    const api = {
        getRepos: () => ({})
    };
    const value = 'mike';
    const action = { payload: value };

    it('should fetch user repos', () => {
        const repos = ['repo', 'list'];
        const generator = userUpdateHandler({ api }, action);

        let next = generator.next();
        let expected = call(delay, USER_REQUEST_DELAY);
        assert.deepEqual(next.value, expected);

        next = generator.next();
        expected = put(saveUsername(value));
        assert.deepEqual(next.value, expected);

        next = generator.next();
        expected = put(reposPending());
        assert.deepEqual(next.value, expected);

        next = generator.next();
        expected = call(api.getRepos, value);
        assert.deepEqual(next.value, expected);

        next = generator.next(repos);
        expected = put(reposReceived(repos));
        assert.deepEqual(next.value, expected);
    });

    it('should handle network errors', () => {
        const error = 'error message';

        const generator = userUpdateHandler({ api }, action);

        let next = generator.next();
        let expected = call(delay, USER_REQUEST_DELAY);
        assert.deepEqual(next.value, expected);

        next = generator.next();
        expected = put(saveUsername(value));
        assert.deepEqual(next.value, expected);

        next = generator.next();
        expected = put(reposPending());
        assert.deepEqual(next.value, expected);

        next = generator.next();
        expected = call(api.getRepos, value);
        assert.deepEqual(next.value, expected);

        next = generator.throw(error);
        expected = put(reposFetchFailed(error));
        assert.deepEqual(next.value, expected);
    });

    it('should erase user data when short username', () => {
        const shortValue = 'a'.repeat(MIN_USER_NAME_LENGTH - 1);
        const actionShortValue = { payload: shortValue };

        const generator = userUpdateHandler({ }, actionShortValue);

        const next = generator.next();
        const expected = put(resetUser());
        assert.deepEqual(next.value, expected);

        assert.isOk(generator.next().done);
    });
});
