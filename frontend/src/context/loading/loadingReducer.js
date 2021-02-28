import { SET_LOADING, RESET_LOADING } from '../types';

const loadingReducer = (state, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case RESET_LOADING:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default loadingReducer;
