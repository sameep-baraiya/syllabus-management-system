import React, { useReducer, useContext } from 'react';
import axios from 'axios';
import CrudInfoContext from './crudInfoContext';
import crudInfoReducer from './crudInfoReducer';
import {
  GET_CRUD_RECORDS,
  CRUD_RECORDS_ERROR,
  CLEAR_ERRORS,
  CLEAR_CRUD_RECORDS,
} from '../types';
import LoadingContext from '../loading/loadingContext';

const CrudInfoState = (props) => {
  const loadingContext = useContext(LoadingContext);
  const { setLoading, resetLoading } = loadingContext;

  const initialState = {
    records: null,
    pagination: null,
    total: 0,
    error: null,
  };

  const [state, dispatch] = useReducer(crudInfoReducer, initialState);

  // Get Crud Records
  const getCRUDRecords = async (query = null) => {
    setLoading();
    try {
      let res;
      if (query == null) {
        res = await axios.get('/api/v1/crud-info');
      } else {
        const sort =
          query.sort !== undefined ? `?sort=${query.sort}` : '?sort=ASC';
        const select =
          query.select !== undefined ? `&select=${query.select}` : '';
        const page = query.page !== undefined ? `&page=${query.page}` : '';
        const limit = query.limit !== undefined ? `&limit=${query.limit}` : '';
        const sortBy =
          query.sortBy !== undefined ? `&sortBy=${query.sortBy}` : '';
        const search =
          query.search !== undefined ? `&search=${query.search}` : '';
        const nestSelect =
          query.nestSelect !== undefined
            ? `&nestSelect=${query.nestSelect}`
            : '';
        let attributes = '';
        if (query.attributes !== undefined) {
          Object.keys(query.attributes).forEach((key) => {
            attributes = attributes.concat(`&${key}=${query.attributes[key]}`);
          });
        }
        const searchQuery =
          sort +
          select +
          page +
          limit +
          sortBy +
          attributes +
          search +
          nestSelect;

        res = await axios.get('/api/v1/crud-info' + searchQuery);
      }

      dispatch({
        type: GET_CRUD_RECORDS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
      dispatch({
        type: CRUD_RECORDS_ERROR,
        payload: err.response,
      });
    } finally {
      resetLoading();
    }
  };

  // Clear Errors
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  // Clear Courses
  const clearCRUDRecords = () => dispatch({ type: CLEAR_CRUD_RECORDS });

  return (
    <CrudInfoContext.Provider
      value={{
        records: state.records,
        error: state.error,
        pagination: state.pagination,
        total: state.total,
        clearErrors,
        getCRUDRecords,
        clearCRUDRecords,
      }}
    >
      {props.children}
    </CrudInfoContext.Provider>
  );
};

export default CrudInfoState;
