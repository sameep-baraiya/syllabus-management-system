import {
  CLEAR_ERRORS,
  CREATE_ACADEMIC_BATCH,
  CREATE_ERROR,
  GET_ACADEMIC_BATCHES,
  ACADEMIC_BATCHES_ERROR,
  CLEAR_ACADEMIC_BATCHES,
  GET_ACADEMIC_BATCH,
  ACADEMIC_BATCH_ERROR,
  CREATE_FILE,
  CREATE_FILE_ERROR,
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
    case CREATE_FILE:
    case CREATE_ACADEMIC_BATCH:
      return {
        ...state,
        error: null,
      };
    case GET_ACADEMIC_BATCH:
      return {
        ...state,
        academicBatch: action.payload.data,
      };
    case ACADEMIC_BATCH_ERROR:
      return {
        ...state,
        academicBatch: null,
        error: action.payload,
      };
    case ACADEMIC_BATCHES_ERROR:
      return {
        ...state,
        academicBatches: null,
        error: action.payload,
      };
    case CREATE_ERROR:
    case CREATE_FILE_ERROR:
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
