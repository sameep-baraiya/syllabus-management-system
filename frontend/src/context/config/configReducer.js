import {
  INIT_CONFIG,
  INIT_CONFIG_ERROR,
  CLEAR_ERRORS,
  UPDATE_ERROR,
  UPDATE_CONFIG,
} from '../types';

const configReducer = (state, action) => {
  switch (action.type) {
    case INIT_CONFIG:
      return {
        ...state,
        error: null,
        departmentType: action.payload.data.departmentType,
        courseType: action.payload.data.courseType,
        subjectType: action.payload.data.subjectType,
      };
    case UPDATE_ERROR:
    case INIT_CONFIG_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case UPDATE_CONFIG:
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export default configReducer;
