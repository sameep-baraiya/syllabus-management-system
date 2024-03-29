import io from 'socket.io-client';
import {
  INIT_NOTIFICATION,
  INIT_NOTIFICATION_ERROR,
  RECONNECT_NOTIFICATION,
  RECONNECT_ERROR,
  // SET_NOTIFICATION,
  CREATE_NOTIFICATION,
  CLEAR_NOTIFICATIONS,
  CLEAR_ERRORS,
} from '../types';
const ENDPOINT = 'http://127.0.0.1:5000';

const notificationReducer = (state, action) => {
  switch (action.type) {
    case INIT_NOTIFICATION:
      const socket = io(ENDPOINT, {
        transports: ['websocket', 'polling', 'flashsocket'],
      });
      socket.on('connect', () => {
        console.log('Connected With Server');
        socket.emit('INIT_NOTIFICATION', { id: action.payload });
      });
      return {
        ...state,
        socket: socket,
      };
    case RECONNECT_NOTIFICATION:
      state.socket.connect();
      return {
        ...state,
      };
    case CREATE_NOTIFICATION:
      let tray = null;
      if (!state.tray) {
        tray = [];
      } else {
        tray = [...state.tray];
      }
      tray.push({ ...action.payload });
      return {
        ...state,
        tray: tray,
      };
    case CLEAR_NOTIFICATIONS:
      return {
        ...state,
        tray: null,
      };
    case RECONNECT_ERROR:
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
