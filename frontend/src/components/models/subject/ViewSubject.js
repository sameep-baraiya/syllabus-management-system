import React, { Fragment, useContext } from 'react';
import { Card, Badge, Table, Button, Row, Col } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

// Layout
import { iconSubject } from '../../layout/Icon';

// Context
import DownloadContext from '../../../context/download/downloadContext';

// Utils
import unf from '../../../utils/unf';
import cellMaker from '../../../utils/cellMaker';
import cellMakerHeadGroups from '../../../utils/cellMakerHeadGroups';

// TODO Table View & JSON View
const ViewSubject = ({ subject = null }) => {
  const history = useHistory();

  const downloadContext = useContext(DownloadContext);
  const { download, viewFile } = downloadContext;

  if (!unf(subject)) {
    return null;
  }
  const {
    subjectCode,
    subjectName,
    subjectShort,
    subjectType,
    subjectDescription,
    department,
    theoryFile,
    isElective,
    semNo,
    listIndex,
    isFreezed,
    crudInfo,
    practicalFile,
    headMasterJSON,
    noOfFiles,
    updateNo,
    isOutdated,
    createdAt,
    updatedAt,
    successorId,
    predecessorId,
    files,
  } = subject;

  if (!unf(subjectCode) || !unf(subjectName)) {
    return null;
  }

  const crudInfoType = (type) => {
    switch (type) {
      case 'SUBJECT_CREATE':
        return 'Subject Created';
      case 'SUBJECT_UPDATE':
        return 'Subject Created';
      default:
        return 'Unexpected CRUD Operation';
    }
  };

  const fileUI = (fileObj, tilte) => {
    if (!fileObj) {
      return null;
    }

    const { name } = fileObj;
    const nameArray = name.split('.');
    const extension = nameArray.pop();
    const newNameArray = nameArray.join('').split('-');
    const date = newNameArray.pop();

    return (
      <Fragment>
        <div className='mb-1'>
          <div>
            <strong>{tilte} :</strong>
          </div>
          <Row>
            <Col>
              <div>
                <strong className='text-muted'>File Name : </strong>
                {newNameArray.join('-')}
              </div>
              <div>
                <strong className='text-muted'>Extension : </strong>
                {extension}
              </div>
              <div>
                <strong className='text-muted'>Upload Date : </strong>
                {new Date(parseInt(date, 10)).toLocaleString('en-BZ', {
                  hour12: true,
                })}
              </div>
            </Col>
            <Col md={3}>
              <Button
                block
                varinat='primary'
                onClick={() => {
                  viewFile(fileObj.path);
                }}
              >
                View {tilte} File
              </Button>
              <Button
                block
                variant='success'
                onClick={() => {
                  download(fileObj.path);
                }}
              >
                Dowload {tilte} File
              </Button>
            </Col>
          </Row>
        </div>
      </Fragment>
    );
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>
          {iconSubject} {subjectName}{' '}
          <Badge className='text-muted'>({subjectCode})</Badge>
        </Card.Title>
        <Card.Subtitle className='mb-1'>
          <div className='mb-1'>
            <Badge variant='secondary'>{subjectShort}</Badge>{' '}
            <Badge variant='success'>{department}</Badge>{' '}
            <Badge variant='info'>{subjectType}</Badge>{' '}
            <Badge style={{ backgroundColor: '#FF8C00', color: 'white' }}>
              {unf(updateNo) && `Version Number : ${updateNo}`}
            </Badge>
          </div>
          <div>
            <Badge variant='primary'>{unf(semNo) && `Sem No: ${semNo}`}</Badge>{' '}
            <Badge style={{ backgroundColor: '#DA70D6', color: 'white' }}>
              {unf(listIndex) && `List Index: ${listIndex}`}
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
          </div>
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
                <tr>
                  {cellMakerHeadGroups(
                    headMasterJSON.headGroups,
                    headMasterJSON.headGroupsLength
                  )}
                </tr>
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
        {fileUI(theoryFile, 'Theory')}
        {fileUI(practicalFile, 'Practical')}
        {unf(crudInfo) && (
          <Fragment>
            <div className='mb-1'>
              <strong>Last CRUD Opertaion :</strong>
              <br />
              {crudInfoType(crudInfo.type)}
              <span className='text-muted'>
                {' '}
                - By {crudInfo.by.split('-').join(' ')}
              </span>
            </div>
          </Fragment>
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
        <Row>
          <Col>
            {unf(predecessorId) && (
              <Fragment>
                <div className='mb-1'>
                  <strong>Predecessor Subject : </strong>
                  <br />
                  <Button
                    onClick={() => {
                      history.push(`/dashboard/subject?id=${predecessorId}`);
                    }}
                  >
                    Show Predecessor Subject
                  </Button>
                </div>
              </Fragment>
            )}
          </Col>
          <Col>
            {unf(successorId) && (
              <Fragment>
                <div className='mb-1'>
                  <strong>Successor Subject : </strong>
                  <br />
                  <Button
                    onClick={() => {
                      history.push(`/dashboard/subject?id=${successorId}`);
                    }}
                  >
                    Show Successor Subject
                  </Button>
                </div>
              </Fragment>
            )}
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

ViewSubject.propTypes = {
  subject: PropTypes.object,
};

export default ViewSubject;
