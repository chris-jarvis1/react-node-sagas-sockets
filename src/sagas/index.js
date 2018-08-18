import { all } from 'redux-saga/effects';
import watchChats from './chat.saga';

export default function *watchAll() {
    yield all([
        watchChats()
    ]);
}
