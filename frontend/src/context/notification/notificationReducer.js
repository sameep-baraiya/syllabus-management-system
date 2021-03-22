import io from 'socket.io-client';
import {
  INIT_NOTIFICATION,
  INIT_NOTIFICATION_ERROR,
  // SET_NOTIFICATION,
  CLEAR_ERRORS,
} from '../types';
const ENDPOINT = 'http://127.0.0.1:5000';

const notificationReducer = (state, action) => {
  switch (action.type) {
    case INIT_NOTIFICATION:
      const socket = io(ENDPOINT, {
        transports: ['websocket', 'polling', 'flashsocket'],
      });
      socket.on('connect', (data) => {
        console.log('Connected With Server');
      });
      return {
        ...state,
        socket: socket,
      };
    case INIT_NOTIFICATION_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export default notificationReducer;
