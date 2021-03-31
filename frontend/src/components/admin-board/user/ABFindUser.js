import React, { useContext } from 'react';

// Context
import UserContext from '../../../context/user/userContext';

// User Model Componets
import FindUser from '../../models/user/FindUser';
import ViewUser from '../../models/user/ViewUser';

const ABFindUser = () => {
  const userContext = useContext(UserContext);
  const { users } = userContext;

  return (
    <div>
      <br />
      <div>
        <FindUser defaultSelect='all' />
        {users && users.map((it, index) => <ViewUser user={it} key={index} />)}
      </div>
    </div>
  );
};

export default ABFindUser;
