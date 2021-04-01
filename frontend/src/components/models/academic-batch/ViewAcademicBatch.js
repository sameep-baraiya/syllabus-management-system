import React, { Fragment, useContext } from 'react';
import { Card, Badge, Button, Alert, Table } from 'react-bootstrap';
import { iconAcademicBatch } from '../../layout/Icon';
import PropTypes from 'prop-types';

// Utils
import unf from '../../../utils/unf';

// Context
import AcademicBatchContext from '../../../context/academicBatch/academicBatchContext';
import DownloadContext from '../../../context/download/downloadContext';

const ViewAcademicBatch = ({ academicBatch = null }) => {
  const academicBatchContext = useContext(AcademicBatchContext);
  const {
    getAcademicBatch,
    academicBatch: contextAcademicBatch,
  } = academicBatchContext;

  const downloadContext = useContext(DownloadContext);
  const { download, viewFile } = downloadContext;

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
    files,
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
        {!(
          contextAcademicBatch &&
          contextAcademicBatch.academicBatchCode ===
            academicBatch.academicBatchCode
        ) && (
          <div>
            <Button
              onClick={() => {
                getAcademicBatch({
                  id: academicBatch.id,
                  nestSelect: 'Course,Subject',
                });
              }}
              block
              size='sm'
            >
              Get Course and Subjects data
            </Button>
          </div>
        )}
        {contextAcademicBatch &&
          contextAcademicBatch.academicBatchCode ===
            academicBatch.academicBatchCode && (
            <div>
              {contextAcademicBatch.course && (
                <Alert variant='info'>
                  <strong>Course : </strong>
                  <br />
                  {contextAcademicBatch.course.courseCode}:{' '}
                  {contextAcademicBatch.course.courseName} [
                  {contextAcademicBatch.course.department},{' '}
                  {contextAcademicBatch.course.courseType}]
                </Alert>
              )}
              {contextAcademicBatch.subjects && (
                <div>
                  <Table bordered striped size='sm'>
                    <thead>
                      <tr className='table-secondary'>
                        <th width='2%'>#</th>
                        <th width='20%'>Subject Code</th>
                        <th width='45%'>Subject Name</th>
                        <th width='15%'>Subject Short</th>
                        <th width='6%'>Sem No</th>
                        <th width='6%'>List Index</th>
                      </tr>
                    </thead>
                    <tbody>
                      {contextAcademicBatch.subjects.map((sub, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{sub.subjectCode}</td>
                          <td>{sub.subjectName}</td>
                          <td>{sub.subjectShort}</td>
                          <td>{sub.semNo}</td>
                          <td>{sub.listIndex}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              )}
            </div>
          )}
        {unf(files) && Array.isArray(files) && (
          <Fragment>
            <div>
              <strong>Files :</strong>
              <br />
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Index</th>
                    <th>File Name</th>
                    <th>Type</th>
                    <th>Extension</th>
                    <th>Upload Date</th>
                    <th>Opertion</th>
                  </tr>
                </thead>
                <tbody>
                  {files.map((file, index) => {
                    const { name } = file;
                    const nameArray = name.split('.');
                    const extension = nameArray.pop();
                    const newNameArray = nameArray.join('').split('-');
                    const type = newNameArray[0];
                    const date = newNameArray.pop();
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{newNameArray.join('-')}</td>
                        <td>{type}</td>
                        <td>{extension}</td>
                        <td>
                          {new Date(parseInt(date, 10)).toLocaleString(
                            'en-BZ',
                            {
                              hour12: true,
                            }
                          )}
                        </td>
                        <td>
                          <Button
                            variant='primary'
                            size='sm'
                            block
                            onClick={() => {
                              viewFile(file.path);
                            }}
                          >
                            View
                          </Button>
                          <Button
                            variant='success'
                            size='sm'
                            block
                            onClick={() => {
                              download(file.path);
                            }}
                          >
                            Download
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
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
