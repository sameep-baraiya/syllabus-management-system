import { Fragment } from 'react';
import { Card, Badge, Table, Button } from 'react-bootstrap';
import { iconSubject } from '../layout/Icon';

const SubjectCardView = (subject, index, downloadCallback) => {
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
    successorId,
    predecessorId,
    files,
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
            <Badge variant='warning'>
              {noOfFiles && `No of Files: ${noOfFiles}`}
            </Badge>{' '}
            <Badge variant='info'>
              {updateNo !== undefined ? `Version: ${updateNo}` : null}
            </Badge>{' '}
            <Badge variant='dark'>{isElective ? 'elective' : null}</Badge>{' '}
            <Badge variant='danger'>{isOutdated ? 'outdated' : null}</Badge>
          </Card.Subtitle>
          {createdAt && (
            <Fragment>
              <br />
              <strong>Subject Created At:</strong>{' '}
              {new Date(createdAt).toLocaleString('en-BZ', {
                hour12: true,
              })}
            </Fragment>
          )}
          {updatedAt && (
            <Fragment>
              <br />
              <strong>Subject Updated At:</strong>{' '}
              {new Date(updatedAt).toLocaleString('en-BZ', {
                hour12: true,
              })}
            </Fragment>
          )}
          {successorId && (
            <Fragment>
              <br />
              <strong>Successor Id:</strong> {successorId}
            </Fragment>
          )}
          {predecessorId && (
            <Fragment>
              <br />
              <strong>Predecessor Id:</strong> {predecessorId}
            </Fragment>
          )}
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
          {subjectDescription && (
            <Fragment>
              <br />
              <strong>Description: </strong>
              <br />
              {subjectDescription}
            </Fragment>
          )}
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
          {files && (
            <Fragment>
              <br />
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
                            name={file.path}
                            variant='success'
                            size='sm'
                            onClick={downloadCallback}
                          >
                            Download
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
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

export default SubjectCardView;
