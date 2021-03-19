import React, { Fragment } from 'react';
import { Card, Badge } from 'react-bootstrap';
import { iconAcademicBatch } from '../../layout/Icon';
import PropTypes from 'prop-types';

// Utils
import unf from '../../../utils/unf';

const ViewAcademicBatch = ({ academicBatch = null }) => {
  if (!unf(academicBatch)) {
    return null;
  }

  const {
    academicBatchCode,
    academicBatchDescription,
    academicBatchName,
    startYear,
    endYear,
    isFreezed,
    createdAt,
    updatedAt,
    crudInfo,
  } = academicBatch;

  if (!unf(academicBatchCode) || !unf(academicBatchName)) {
    return null;
  }

  const crudInfoType = (type) => {
    switch (type) {
      case 'ACADEMIC_BATCH_CREATE':
        return 'Academic Batch Created';
      case 'ACADEMIC_BATCH_UPDATE':
        return 'Academic Batch Updated';
      default:
        return 'Unexpected CRUD Operation';
    }
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>
          {iconAcademicBatch} {academicBatchName}{' '}
          <Badge className='text-muted'>({academicBatchCode})</Badge>
        </Card.Title>
        <Card.Subtitle className='mb-1'>
          <Badge variant='primary'>
            {unf(startYear) && `Start Year: ${startYear}`}
          </Badge>{' '}
          <Badge variant='info'>{unf(endYear) && `End Year: ${endYear}`}</Badge>{' '}
          <Badge variant='danger'>
            {unf(isFreezed) && isFreezed && 'freezed'}
          </Badge>
        </Card.Subtitle>
        {unf(createdAt) && (
          <div className='mb-1'>
            <strong>Academic Batch Created At:</strong>{' '}
            {new Date(createdAt).toLocaleString('en-BZ', {
              hour12: true,
            })}
          </div>
        )}
        {unf(updatedAt) && (
          <div className='mb-1'>
            <strong>Academic Batch Updated At:</strong>{' '}
            {new Date(updatedAt).toLocaleString('en-BZ', {
              hour12: true,
            })}
          </div>
        )}
        {unf(academicBatchDescription) && (
          <Fragment>
            <div className='mb-1'>
              <strong>Description: </strong>
              <br />
              {academicBatchDescription}
            </div>
          </Fragment>
        )}
        {unf(crudInfo) && (
          <Fragment>
            <div className='mb-1'>
              <strong>Last CRUD Opertaion :</strong>
              <br />
              {crudInfoType(crudInfo.type)}
              <span className='text-muted'> - By {crudInfo.by}</span>
            </div>
          </Fragment>
        )}
      </Card.Body>
    </Card>
  );
};

ViewAcademicBatch.propTypes = {
  academicBatch: PropTypes.object,
};

export default ViewAcademicBatch;
