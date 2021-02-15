import { Fragment } from 'react';
import { Table } from 'react-bootstrap';

const subjectListView = (subjects = []) => {
  return (
    <Fragment>
      <div style={{ overflow: 'auto' }}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Subject Code</th>
              <th>Subject Name</th>
              <th>Subject Short</th>
              <th>Eepartment</th>
              <th>Is Elective ?</th>
              <th>NoOf Files</th>
              <th>Version No</th>
              <th>Is Outdated ?</th>
              <th>Created At</th>
              <th>Updated At</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((it, index) => {
              return (
                <tr key={index}>
                  <td>{it.subjectCode}</td>
                  <td>{it.subjectName}</td>
                  <td>{it.subjectShort}</td>
                  <td>{it.department}</td>
                  <td>{it.isElective === true ? 'Yes' : 'No'}</td>
                  <td>{it.noOfFiles}</td>
                  <td>{it.updateNo}</td>
                  <td>{it.isOutdated === true ? 'Yes' : 'No'}</td>
                  <td>
                    {new Date(it.createdAt).toLocaleString('en-BZ', {
                      hour12: true,
                    })}
                  </td>
                  <td>
                    {new Date(it.updatedAt).toLocaleString('en-BZ', {
                      hour12: true,
                    })}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </Fragment>
  );
};
export default subjectListView;
