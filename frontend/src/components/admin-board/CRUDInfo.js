import React, { useContext, useEffect, useState } from 'react';
import { Table, InputGroup, Button, Row, Col, Form } from 'react-bootstrap';

// Layout
import { iconSearch } from '../layout/Icon';

// Utils
import s2pn from '../../utils/s2pn';

// Context
import CrudInfoContext from '../../context/crud-info/crudInfoContext';

const CRUDInfo = () => {
  const crudInfoContext = useContext(CrudInfoContext);
  const { records, getCRUDRecords, clearCRUDRecords } = crudInfoContext;

  const [searchQuery, setSearchQuery] = useState({
    search: '',
    page: 0,
    limit: 20,
    sortBy: 'id',
    attributes: {},
  });
  const { search } = searchQuery;

  useEffect(() => {
    console.log('Test');
    clearCRUDRecords();
    // eslint-disable-next-line
  }, [search]);

  const onSearchInputChange = (e) => {
    setSearchQuery({
      ...searchQuery,
      search: e.target.value,
    });
  };

  const onSearchClick = (e) => {
    getCRUDRecords(searchQuery);
  };

  const onChangeSortBy = (e) => {
    setSearchQuery({
      ...searchQuery,
      sortBy: e.target.value,
    });
  };

  const onChangeModel = (e) => {
    const newAttributes = searchQuery.attributes;
    if (e.target.value !== 'None') {
      newAttributes.model = e.target.value;
      setSearchQuery({
        ...searchQuery,
        attributes: newAttributes,
      });
    } else {
      delete newAttributes.model;
      setSearchQuery({
        ...searchQuery,
        attributes: newAttributes,
      });
    }
  };

  const onChangeCRUDType = (e) => {
    const newAttributes = searchQuery.attributes;
    if (e.target.value !== 'ALL') {
      newAttributes.type = e.target.value;
      setSearchQuery({
        ...searchQuery,
        attributes: newAttributes,
      });
    } else {
      delete newAttributes.type;
      setSearchQuery({
        ...searchQuery,
        attributes: newAttributes,
      });
    }
  };

  const onChangeSortMethod = (e) => {
    setSearchQuery({
      ...searchQuery,
      sort: e.target.value,
    });
  };

  const onChangeLimit = (e) => {
    setSearchQuery({
      ...searchQuery,
      limit: s2pn(e.target.value),
    });
  };

  const onChangePageNo = (e) => {
    setSearchQuery({
      ...searchQuery,
      page: s2pn(e.target.value),
    });
  };

  return (
    <div>
      <br />
      <div>
        <h3>
          <strong>{iconSearch} Search CRUD Records</strong>
        </h3>
        <InputGroup>
          <Form.Control
            name='searchQuery'
            type='text'
            placeholder='Search by message, user name'
            value={search}
            onChange={onSearchInputChange}
          />
          <InputGroup.Append>
            <Button
              variant='outline-success'
              type='submit'
              onClick={onSearchClick}
            >
              Search
            </Button>
          </InputGroup.Append>
        </InputGroup>
        <div className='mt-2'>
          <strong className='text-muted'>More Options:</strong>
        </div>
        <Row>
          <Col>
            <Form.Label>Model</Form.Label>
            <Form.Control name='sortBy' as='select' onChange={onChangeModel}>
              <option value='None'>None</option>
              <option value='User'>User</option>
              <option value='Subject'>Subject</option>
              <option value='Course'>Course</option>
              <option value='Academic Batch'>Academic Batch</option>
              <option value='Academic Batch Subject'>
                Academic Batch Subject
              </option>
              <option value='Meeting'>Meeting</option>
              <option value='Account Request'>Account Request</option>
            </Form.Control>
            <br />

            <Form.Label>CRUD Type</Form.Label>
            <Form.Check
              name='crudType'
              type='radio'
              label='All'
              value='ALL'
              defaultChecked
              onChange={onChangeCRUDType}
            />
            <Form.Check
              name='crudType'
              type='radio'
              label='Create'
              value='CREATE'
              onChange={onChangeCRUDType}
            />
            <Form.Check
              name='crudType'
              type='radio'
              label='Update'
              value='UPDATE'
              onChange={onChangeCRUDType}
            />
            <Form.Check
              name='crudType'
              type='radio'
              label='Delete'
              value='DELETE'
              onChange={onChangeCRUDType}
            />
          </Col>
          <Col>
            <Form.Label>Sort By</Form.Label>
            <Form.Control name='sortBy' as='select' onChange={onChangeSortBy}>
              <option value='id'>Id (default)</option>
              <option value='type'>CRUD Type</option>
              <option value='model'>Model Name</option>
              <option value='by'>User Name</option>
              <option value='createdAt'>Created At</option>
            </Form.Control>
            <br />
            <Form.Label>Sort Method</Form.Label>
            <Form.Check
              type='radio'
              label='Ascending Order (default)'
              name='sort'
              id='ascSortMethod'
              value='ASC'
              defaultChecked
              onChange={onChangeSortMethod}
            />
            <Form.Check
              type='radio'
              label='Descending Order'
              name='sort'
              value='DESC'
              id='descSortMethod'
              onChange={onChangeSortMethod}
            />
          </Col>
          <Col>
            <Form.Label>Results Per Page (default 5)</Form.Label>
            <Form.Control
              name='limit'
              type='number'
              placeholder='Enter limit'
              value={searchQuery.limit}
              onChange={onChangeLimit}
            />
            <br />
            <Form.Label>Page Number (default 0)</Form.Label>
            <Form.Control
              name='page'
              type='number'
              placeholder='Enter Page Number'
              value={searchQuery.page}
              onChange={onChangePageNo}
            />
          </Col>
        </Row>
      </div>
      <br />
      <Table bordered striped>
        <thead>
          <tr>
            <th>#</th>
            <th>Message</th>
            <th>Type</th>
            <th>Model</th>
            <th>By User</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {records &&
            records.map((it, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{it.msg}</td>
                <td>{it.type}</td>
                <td>{it.model}</td>
                <td>{it.by}</td>
                <td>
                  {new Date(it.createdAt).toLocaleString('en-BZ', {
                    hour12: true,
                  })}
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default CRUDInfo;
