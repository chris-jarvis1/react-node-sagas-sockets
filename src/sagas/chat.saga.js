import { select, call, put, take, takeEvery } from 'redux-saga/effects';
import { eventChannel, END } from 'redux-saga'

function *sendMessage(action) {
    const socket = yield select(state => state.chat.socket);

    socket.emit('SEND_MESSAGE', {
        message: JSON.stringify(action.message)
    });
}

function createSocketChannel(socket) {
    return eventChannel(emit => {
        const addMessage = data => {
            emit(data);
        };

        socket.on('RECEIVE_MESSAGE', addMessage);

        const unsubscribe = () => {
            socket.off('RECEIVE_MESSAGE', addMessage)
        }

        return unsubscribe;
    })
}

export function *watchChatEvents() {
    yield put({ type: 'CREATE_SOCKET' });
    const socket = yield select(state => state.chat.socket);
    const socketChannel = yield call(createSocketChannel, socket);

    while (true) {
        try {
            const message = yield take(socketChannel);
            yield put({ type: 'ADD_MESSAGE', message: JSON.parse(message.message) });
        } catch (err) {
            console.error('socket error:', err)
        }
    }
}

export default function *watchChats() {
    yield takeEvery('SEND_MESSAGE', sendMessage);
    yield takeEvery('LISTEN_TO_CHAT', watchChatEvents);
}
