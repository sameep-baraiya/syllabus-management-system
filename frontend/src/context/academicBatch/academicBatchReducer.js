import {
  CLEAR_ERRORS,
  CREATE_ACADEMIC_BATCH,
  CREATE_ERROR,
  GET_ACADEMIC_BATCHES,
  ACADEMIC_BATCHES_ERROR,
  CLEAR_ACADEMIC_BATCHES,
} from '../types';

const authReducer = (state, action) => {
  switch (action.type) {
    case GET_ACADEMIC_BATCHES:
      return {
        ...state,
        academicBatches: action.payload.data,
        total: action.payload.total,
        pagination: action.payload.pagination,
      };
    case CLEAR_ACADEMIC_BATCHES:
      return {
        ...state,
        academicBatches: null,
        total: 0,
        pagination: null,
      };
    case CREATE_ACADEMIC_BATCH:
      return {
        ...state,
        error: null,
      };
    case ACADEMIC_BATCHES_ERROR:
      return {
        ...state,
        academicBatches: null,
        error: action.payload,
      };
    case CREATE_ERROR:
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

export default authReducer;
