import { userSaga } from './user/';

// Single entry point to start all Sagas at once
export default function* rootSaga(context) {
    yield [
        userSaga(context)
    ];
}
