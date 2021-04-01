import React, { Fragment, useContext } from 'react';
import { Card, Badge, Button, Table } from 'react-bootstrap';
import { iconMeeting } from '../../layout/Icon';
import PropTypes from 'prop-types';

// Utils
import unf from '../../../utils/unf';

// Context
import DownloadContext from '../../../context/download/downloadContext';

const ViewMeeting = ({ meeting }) => {
  const downloadContext = useContext(DownloadContext);
  const { download } = downloadContext;

  if (!unf(meeting)) {
    return null;
  }

  const {
    meetingCode,
    meetingsNotes,
    dateOfMeeting,
    meetingType,
    requestedChanges,
    department,
    files,
    noOfFiles,
    // relationObject,
    isFreezed,
    createdAt,
    updatedAt,
    crudInfo,
  } = meeting;

  if (!unf(meetingCode)) {
    return null;
  }

  const crudInfoType = (type) => {
    switch (type) {
      case 'MEETING_CREATE':
        return 'Meeting Created';
      case 'MEETING_UPDATE':
        return 'Meeting Updated';
      default:
        return 'Unexpected CRUD Operation';
    }
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>
          {iconMeeting} {meetingCode}
        </Card.Title>
        <Card.Subtitle className='mb-1'>
          <Badge variant='primary'>{meetingType}</Badge>{' '}
          <Badge variant='success'>{department}</Badge>{' '}
          <Badge variant='warning'>
            {unf(noOfFiles) && `No of Files: ${noOfFiles}`}
          </Badge>{' '}
          <Badge variant='danger'>
            {unf(isFreezed) && isFreezed && 'freezed'}
          </Badge>
        </Card.Subtitle>
        {unf(dateOfMeeting) && (
          <div className='mb-1'>
            <strong>Date of Meeting:</strong>{' '}
            {new Date(dateOfMeeting).toLocaleString('en-BZ', {
              hour12: true,
            })}
          </div>
        )}
        {unf(createdAt) && (
          <div className='mb-1'>
            <strong>Course Created At:</strong>{' '}
            {new Date(createdAt).toLocaleString('en-BZ', {
              hour12: true,
            })}
          </div>
        )}
        {unf(updatedAt) && (
          <div className='mb-1'>
            <strong>Course Updated At:</strong>{' '}
            {new Date(updatedAt).toLocaleString('en-BZ', {
              hour12: true,
            })}
          </div>
        )}
        {unf(meetingsNotes) && (
          <Fragment>
            <div className='mb-1'>
              <strong>Description: </strong>
              <br />
              {meetingsNotes}
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
        {unf(requestedChanges) && Array.isArray(requestedChanges) && (
          <Fragment>
            <div className='mb-1'>
              <strong>Files :</strong>
              <br />
              <Table bordered>
                <thead>
                  <tr className='table-secondary'>
                    <th>Index</th>
                    <th>Type of Change</th>
                    <th>Type of Modificaion</th>
                    <th>Effective From</th>
                    <th>Is Approved</th>
                  </tr>
                </thead>
                <tbody>
                  {requestedChanges.map((rq, index) => (
                    <Fragment key={index}>
                      <tr className='table-info'>
                        <td>{index + 1}</td>
                        <td>{rq.type}</td>
                        <td>{rq.mType}</td>
                        <td>
                          {new Date(rq.effectiveFrom).toLocaleString('en-BZ', {
                            hour12: true,
                          })}
                        </td>
                        <td>{rq.isApproved === true ? 'Yes' : 'No'}</td>
                      </tr>
                      <tr>
                        <td colSpan={5}>
                          <strong>Subject :</strong> {rq.linkedSubjectCode}:{' '}
                          {rq.linkedSubjectName}
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={5}>
                          <strong>Description :</strong>
                          <br />
                          {rq.description}
                        </td>
                      </tr>
                    </Fragment>
                  ))}
                </tbody>
              </Table>
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
      </Card.Body>
    </Card>
  );
};

ViewMeeting.propTypes = {
  meeting: PropTypes.object,
};

export default ViewMeeting;
