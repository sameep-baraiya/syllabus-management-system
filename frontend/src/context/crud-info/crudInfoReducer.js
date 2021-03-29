import {
  GET_CRUD_RECORDS,
  CRUD_RECORDS_ERROR,
  CLEAR_ERRORS,
  CLEAR_CRUD_RECORDS,
} from '../types';

const crudInfoReducer = (state, action) => {
  switch (action.type) {
    case GET_CRUD_RECORDS:
      return {
        ...state,
        error: null,
        records: action.payload.data,
        total: action.payload.total,
        pagination: action.payload.pagination,
      };
    case CLEAR_CRUD_RECORDS:
      return {
        ...state,
        records: null,
        total: 0,
        pagination: null,
      };
    case CRUD_RECORDS_ERROR:
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

export default crudInfoReducer;
