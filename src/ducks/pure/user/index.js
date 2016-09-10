export const USER_REPOS_REQUESTED_PENDING = 'USER_REPOS_REQUESTED_PENDING';
export const USER_REPOS_REQUESTED_DONE = 'USER_REPOS_REQUESTED_DONE';
export const USER_REPOS_REQUESTED_FAILED = 'USER_REPOS_REQUESTED_FAILED';

export const USER_NAME_SAVED = 'USER_NAME_SAVED';
export const USER_RESETED = 'USER_RESETED';

// ----------------------------------------------------------------------------
// Reducer
// ----------------------------------------------------------------------------

const initialState = {
    name: '',
    repos: [],
    isPending: false,
    error: null
};

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {

        case USER_REPOS_REQUESTED_PENDING:
            return Object.assign({}, state, {
                isPending: true,
                error: null
            });

        case USER_REPOS_REQUESTED_DONE:
            return Object.assign({}, state, {
                repos: action.payload,
                isPending: false
            });

        case USER_REPOS_REQUESTED_FAILED:
            return Object.assign({}, state, {
                isPending: false,
                error: action.payload
            });

        case USER_NAME_SAVED:
            return Object.assign({}, state, {
                name: action.payload
            });

        case USER_RESETED:
            return initialState;

        default:
            return state;
    }
}

// ----------------------------------------------------------------------------
// Plain action creators (return plain objects)
// ----------------------------------------------------------------------------

export const reposPending = () => ({
    type: USER_REPOS_REQUESTED_PENDING
});

export const reposReceived = (payload) => ({
    type: USER_REPOS_REQUESTED_DONE,
    payload
});

export const reposFetchFailed = (error) => ({
    type: USER_REPOS_REQUESTED_FAILED,
    payload: error
});

export const saveUsername = (payload) => ({
    type: USER_NAME_SAVED,
    payload
});

export const resetUser = () => ({
    type: USER_RESETED
});
