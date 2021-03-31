import React, { useState, useContext } from 'react';
import { Button, Card } from 'react-bootstrap';

// User Model Components
import DeleteUser from '../../models/user/DeleteUser';
import FindUser from '../../models/user/FindUser';
import ViewUser from '../../models/user/ViewUser';

// Context
import UserContext from '../../../context/user/userContext';

const ABDeleteUser = () => {
  const userContext = useContext(UserContext);
  const { users, getUser, user } = userContext;

  const [operationMode, setOperationMode] = useState('');
  const [isSelected, setIsSelected] = useState(false);
  const [mode, setMode] = useState('');

  const onSelectClick = (id) => {
    setIsSelected(true);
    getUser(id);
  };

  const onUserSelectClick = () => {
    if (operationMode === 'original') {
      setMode('original');
    }
    setIsSelected(false);
    setOperationMode('');
  };

  const selectionList = () => {
    return (
      <div>
        <FindUser defaultSelect='id,name,email,department' />
        {users &&
          users.map((it, index) => (
            <div
              key={index}
              className='p-3 mb-2 bg-dark text-white'
              onClick={() => onSelectClick(it.id)}
              style={{
                cursor: 'pointer',
              }}
            >
              <span className='pt-1 pb-1 pl-3 pr-3 mr-3 bg-secondary text-white'>
                Select
              </span>
              {it.name.split('-').join(' ')} ({it.email}) {it.department}
            </div>
          ))}
      </div>
    );
  };

  return (
    <div>
      <br />
      <h2>
        <strong>Delete User</strong>
      </h2>
      <div className='mb-3'>
        Select operation :{' '}
        <Button
          variant={operationMode === 'original' ? 'info' : 'outline-info'}
          onClick={() => {
            operationMode === 'original'
              ? setOperationMode('')
              : setOperationMode('original');
          }}
          block
        >
          Set Original User
        </Button>
      </div>
      {operationMode && (
        <Card>
          <Card.Header>Find and Select for setting original user</Card.Header>
          <Card.Body>
            {isSelected ? (
              <div>
                <ViewUser user={user} />
                <br />
                <Button variant='success' onClick={onUserSelectClick}>
                  Select
                </Button>{' '}
                <Button
                  variant='secondary'
                  onClick={() => {
                    setIsSelected(false);
                  }}
                >
                  Back To Search
                </Button>
              </div>
            ) : (
              selectionList()
            )}
          </Card.Body>
        </Card>
      )}
      <hr />
      <DeleteUser mode={mode} setMode={setMode} />
      <br />
    </div>
  );
};

export default ABDeleteUser;
