import React, { Fragment } from 'react';
import { Table } from 'react-bootstrap';
import PropTypes from 'prop-types';

// Utils
import unf from '../../../utils/unf';
import cellMaker from '../../../utils/cellMaker';
import cellMakerHeadGroups from '../../../utils/cellMakerHeadGroups';

const SubjectReqView = ({ reqObj = null }) => {
  if (!unf(reqObj)) {
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
    practical,
    headMasterJSON,
    noOfFiles,
    isOutdated,
    files,
  } = reqObj;

  if (!unf(subjectCode) || !unf(subjectName)) {
    return null;
  }

  return (
    <div className='m-2'>
      <div className='mb-1'>
        <strong>Subject Code :</strong> {subjectCode}
      </div>
      <div className='mb-1'>
        <strong>Subject Name :</strong> {subjectName}
      </div>
      <div className='mb-1'>
        <strong>Subject Short :</strong> {subjectShort}
      </div>
      <div className='mb-1'>
        <strong>Department :</strong> {department}
      </div>
      <div className='mb-1'>
        <strong>Is Elective :</strong> {isElective}
      </div>
      <div className='mb-1'>
        <strong>Sem No :</strong>
        {semNo}
      </div>
      <div className='mb-1'>
        <strong>List Index :</strong> {listIndex}
      </div>
      <div className='mb-1'>
        <strong>Is Freezed :</strong> {isFreezed}
      </div>
      <div className='mb-1'>
        <strong>No Of Files :</strong> {noOfFiles}
      </div>
      <div className='mb-1'>
        <strong>Is Outdated :</strong> {isOutdated}
      </div>

      {unf(headMasterJSON) && (
        <div style={{ overflowX: 'auto' }}>
          <div className='mb-1'>
            <strong>Headmaster :</strong>
          </div>
          <Table striped bordered hover size='sm'>
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
        </div>
      )}
      <div className='mb-1'>
        <strong>Description: </strong>
        <br />
        {subjectDescription}
      </div>
      <div className='mb-1'>
        <strong>Theory :</strong>
        <br />
        {theory}
      </div>
      <div className='mb-1'>
        <strong>Practical :</strong>
        <br />
        {practical}
      </div>
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
                </tr>
              </thead>
              <tbody>
                {files.map((file, index) => {
                  const { name } = file;
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{name}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </Fragment>
      )}
    </div>
  );
};

SubjectReqView.propTypes = {
  subject: PropTypes.object,
};

export default SubjectReqView;
