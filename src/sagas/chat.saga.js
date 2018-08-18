import { select, call, put, take, takeEvery } from 'redux-saga/effects';
import { eventChannel, END } from 'redux-saga'

function *sendMessage(action) {
    const socket = yield select(state => state.chat.socket);

    socket.emit('SEND_MESSAGE', {
        message: action.message
    });
}

function createSocketChannel(socket) {
    return eventChannel(emit => {

        socket.on('RECEIVE_MESSAGE', data => {
            emit(data);
        });

        return () => {
            console.log('unsubscribe');
        }
    })
}

export function *watchChatEvents() {
    yield put({ type: 'CREATE_SOCKET' });
    const socket = yield select(state => state.chat.socket);
    const socketChannel = yield call(createSocketChannel, socket);

    while (true) {
        try {
            const message = yield take(socketChannel);
            yield put({ type: 'ADD_MESSAGE', message });
        } catch (err) {
            console.error('socket error:', err)
        }
    }
}

export default function *watchChats() {
    yield takeEvery('SEND_MESSAGE', sendMessage);
    yield takeEvery('LISTEN_TO_CHAT', watchChatEvents);
}
