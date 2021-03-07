import React, { Fragment } from 'react';
import { Card, Badge, Table, Button } from 'react-bootstrap';
import { iconSubject } from '../../layout/Icon';
import PropTypes from 'prop-types';

// Utils
import unf from '../../../utils/unf';
import cellMaker from '../../../utils/cellMaker';
import cellMakerHeadGroups from '../../../utils/cellMakerHeadGroups';

// TODO Table View & JSON View
const ViewSubject = ({ subject = null }) => {
  if (!unf(subject)) {
    return null;
  }
  const {
    subjectCode,
    subjectName,
    subjectShort,
    subjectDescription,
    department,
    theory,
    isElective,
    semNo,
    listIndex,
    isFreezed,
    crudInfo,
    practical,
    headMasterJSON,
    noOfFiles,
    // TODO after create
    // updateNo,
    isOutdated,
    createdAt,
    updatedAt,
    // successorId,
    // predecessorId,
    files,
  } = subject;

  if (!unf(subjectCode) || !unf(subjectName)) {
    return null;
  }

  const crudInfoType = (type) => {
    switch (type) {
      case 'SUBJECT_CREATE':
        return 'Subject Created';
      default:
        return 'Unexpected CRUD Operation';
    }
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>
          {iconSubject} {subjectName}{' '}
          <Badge className='text-muted'>({subjectCode})</Badge>
        </Card.Title>
        <Card.Subtitle className='mb-1'>
          <Badge variant='secondary'>{subjectShort}</Badge>{' '}
          <Badge variant='success'>{department}</Badge>{' '}
          <Badge variant='primary'>{unf(semNo) && `Sem No: ${semNo}`}</Badge>{' '}
          <Badge variant='info'>
            {unf(listIndex) && `List Index: ${semNo}`}
          </Badge>{' '}
          <Badge variant='warning'>
            {unf(noOfFiles) && `No of Files: ${noOfFiles}`}
          </Badge>{' '}
          <Badge variant='dark'>
            {unf(isElective) && isElective && 'elective'}
          </Badge>{' '}
          <Badge variant='danger'>
            {unf(isOutdated) && isOutdated && 'outdated'}
          </Badge>{' '}
          <Badge variant='danger'>
            {unf(isFreezed) && isFreezed && 'freezed'}
          </Badge>
        </Card.Subtitle>
        {unf(createdAt) && (
          <div className='mb-1'>
            <strong>Subject Created At:</strong>{' '}
            {new Date(createdAt).toLocaleString('en-BZ', {
              hour12: true,
            })}
          </div>
        )}
        {unf(updatedAt) && (
          <div className='mb-1'>
            <strong>Subject Updated At:</strong>{' '}
            {new Date(updatedAt).toLocaleString('en-BZ', {
              hour12: true,
            })}
          </div>
        )}
        {unf(headMasterJSON) && (
          <Fragment>
            <div className='mb-1'>
              <strong>Headmaster :</strong>
            </div>
            <Table striped bordered hover>
              <thead>
                <tr>{cellMakerHeadGroups(headMasterJSON.headGroups)}</tr>
              </thead>
              <thead>
                <tr>{cellMaker(headMasterJSON.headMasters)}</tr>
              </thead>
              <tbody>
                <tr>{cellMaker(headMasterJSON.points)}</tr>
              </tbody>
            </Table>
          </Fragment>
        )}
        {unf(subjectDescription) && (
          <Fragment>
            <div className='mb-1'>
              <strong>Description: </strong>
              <br />
              {subjectDescription}
            </div>
          </Fragment>
        )}
        {/* TODO Theory & Practical */}
        {unf(theory) && (
          <Fragment>
            <div className='mb-1'>
              <strong>Theory :</strong>
              <br />
              {theory}
            </div>
          </Fragment>
        )}
        {unf(practical) && (
          <Fragment>
            <div className='mb-1'>
              <strong>Practical :</strong>
              <br />
              {practical}
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
        {unf(files) && (
          <Fragment>
            <div>
              <strong>Files :</strong>
              <br />
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Index</th>
                    <th>File Name</th>
                    <th>Extension</th>
                    <th>Upload Date</th>
                    <th>Download</th>
                  </tr>
                </thead>
                <tbody>
                  {files.map((file, index) => {
                    const { name } = file;
                    const nameArray = name.split('.');
                    const extension = nameArray.pop();
                    const newNameArray = nameArray.join('').split('-');
                    const date = newNameArray.pop();
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{newNameArray.join('-')}</td>
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
                          <Button name={file.path} variant='success' size='sm'>
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

ViewSubject.propTypes = {
  subject: PropTypes.object.isRequired,
};

export default ViewSubject;
