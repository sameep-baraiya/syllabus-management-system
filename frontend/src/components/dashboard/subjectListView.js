import { Fragment } from 'react';
import { Table } from 'react-bootstrap';
import ReactJson from 'react-json-view';

const subjectListView = (subjects = []) => {
  if (subjects[0] === undefined) {
    return <Fragment>No Result</Fragment>;
  }
  const keys = Object.keys(subjects[0]);
  return (
    <Fragment>
      <div style={{ overflow: 'auto' }}>
        <Table striped bordered hover>
          <thead>
            <tr>
              {keys.map((key, index) => (
                <Fragment key={index}>
                  <th>{key}</th>
                </Fragment>
              ))}
            </tr>
          </thead>
          <tbody>
            {subjects.map((it, index) => {
              return (
                <tr key={index}>
                  {keys.map((key, index) => {
                    if (typeof it[key] === 'object') {
                      if (it[key] === null) {
                        return (
                          <Fragment key={index}>
                            <td>Empty</td>
                          </Fragment>
                        );
                      } else {
                        return (
                          <Fragment key={index}>
                            <td>
                              <ReactJson src={it[key]} collapsed />
                            </td>
                          </Fragment>
                        );
                      }
                    } else if (typeof it[key] === 'boolean') {
                      return (
                        <Fragment key={index}>
                          <td>{it[key] === true ? 'Yes' : 'No'}</td>
                        </Fragment>
                      );
                    } else if (typeof it[key] === 'number') {
                      return (
                        <Fragment key={index}>
                          <td>{it[key]}</td>
                        </Fragment>
                      );
                    } else {
                      if (!isNaN(new Date(it[key]))) {
                        return (
                          <Fragment key={index}>
                            <td>
                              {new Date(it[key]).toLocaleString('en-BZ', {
                                hour12: true,
                              })}
                            </td>
                          </Fragment>
                        );
                      } else {
                        return (
                          <Fragment key={index}>
                            <td>{it[key]}</td>
                          </Fragment>
                        );
                      }
                    }
                  })}
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
