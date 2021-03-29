import React, { useContext } from 'react';
import { Button, Table } from 'react-bootstrap';

// Context
import UserContext from '../../context/user/userContext';

const LoggedUsers = () => {
  const userContext = useContext(UserContext);
  const { getLoggedUsers, loggedUsers } = userContext;

  return (
    <div>
      <br />
      <div>
        <Button
          block
          onClick={() => {
            getLoggedUsers();
          }}
        >
          Get Logged Users
        </Button>
      </div>
      <br />
      <Table bordered striped>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Department</th>
            <th>Last Logged In Time</th>
            <th>Number Of Connected Instances</th>
          </tr>
        </thead>
        <tbody>
          {loggedUsers &&
            loggedUsers.map((it, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{it.name.split('-').join(' ')}</td>
                <td>{it.department}</td>
                <td>
                  {new Date(it.at).toLocaleString('en-BZ', {
                    hour12: true,
                  })}
                </td>
                <td>{it.noOfDevices}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default LoggedUsers;
