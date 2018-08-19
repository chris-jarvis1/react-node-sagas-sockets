import socketIOClient from 'socket.io-client';

const ADD_MESSAGE = 'ADD_MESSAGE';
const CREATE_SOCKET = 'CREATE_SOCKET';
const SOCKET_URL = 'http://127.0.0.1:5000';

export const initialState = {
    messages: [],
    socket: null
}

function createSocket(state) {
    const socket = socketIOClient(SOCKET_URL);

    return { ...state, socket }
}

export default function chatReducer(state = initialState, action) {
    switch (action.type) {
    case ADD_MESSAGE:
        return { ...state, messages: [...state.messages, action.message] }
    case CREATE_SOCKET:
        return createSocket(state);
    default:
        return state;
    }
}
