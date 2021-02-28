import { SET_ALERT, RESET_ALERT } from '../types';

const alertReducer = (state, action) => {
  switch (action.type) {
    case SET_ALERT:
      return {
        ...state,
        message: action.payload.message,
        variant: action.payload.variant,
        isVisible: true,
      };
    case RESET_ALERT:
      return {
        ...state,
        isVisible: false,
      };
    default:
      return state;
  }
};

export default alertReducer;
