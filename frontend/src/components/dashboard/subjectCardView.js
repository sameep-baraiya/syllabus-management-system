import { Fragment } from 'react';
import { Card, Badge, Table } from 'react-bootstrap';
import { iconSubject } from '../layout/Icon';

const subjectCardView = (subject, index) => {
  const {
    subjectCode,
    subjectName,
    subjectShort,
    subjectDescription,
    department,
    theory,
    isElective,
    practical,
    headMasterJSON,
    noOfFiles,
    updateNo,
    isOutdated,
    createdAt,
    updatedAt,
  } = subject;
  return (
    <Fragment key={index}>
      <br />
      <Card>
        <Card.Body>
          <Card.Title>
            {iconSubject} {subjectName}
          </Card.Title>
          <Card.Subtitle>
            <Badge variant='primary'>{subjectCode}</Badge>{' '}
            <Badge variant='secondary'>{subjectShort}</Badge>{' '}
            <Badge variant='success'>{department}</Badge>{' '}
            <Badge variant='warning'>Files: {noOfFiles}</Badge>{' '}
            <Badge variant='info'>Version: {updateNo}</Badge>{' '}
            <Badge variant='dark'>{isElective ? 'elective' : null}</Badge>{' '}
            <Badge variant='danger'>{isOutdated ? 'outdated' : null}</Badge>
          </Card.Subtitle>
          <br />
          <strong>Subject Created At:</strong>{' '}
          {new Date(createdAt).toLocaleString('en-BZ', {
            hour12: true,
          })}
          <br />
          <strong>Subject Updated At:</strong>{' '}
          {new Date(updatedAt).toLocaleString('en-BZ', {
            hour12: true,
          })}
          {headMasterJSON && (
            <Fragment>
              <br />
              <strong>Headmaster :</strong>
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
          {subjectDescription ? (
            <Fragment>
              <strong>Description: </strong>
              <br />
              {subjectDescription}
            </Fragment>
          ) : null}
          {theory && (
            <Fragment>
              <br />
              <strong>Theory :</strong>
              <br />
              {theory}
            </Fragment>
          )}
          {practical && (
            <Fragment>
              <br />
              <strong>Practical :</strong>
              <br />
              {practical}
            </Fragment>
          )}
        </Card.Body>
      </Card>
    </Fragment>
  );
};

const cellMaker = (arr = []) => {
  return (
    <Fragment>
      {arr.map((it, index) => (
        <td key={index}>{it}</td>
      ))}
    </Fragment>
  );
};

const cellMakerHeadGroups = (arr = []) => {
  let counts = {};
  for (let i = 0; i < arr.length; i++) {
    let num = arr[i];
    counts[num] = counts[num] ? counts[num] + 1 : 1;
  }
  return (
    <Fragment>
      {Object.keys(counts).map((it, index) => (
        <td key={index} colSpan={counts[it]}>
          {it}
        </td>
      ))}
    </Fragment>
  );
};

export default subjectCardView;
