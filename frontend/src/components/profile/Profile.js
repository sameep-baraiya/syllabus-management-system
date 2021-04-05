import React, { useContext } from 'react';

// User Modle Components
import ViewUser from '../models/user/ViewUser';

// Context
import AuthContext from '../../context/auth/authContext';

const Profile = () => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, user } = authContext;

  if (isAuthenticated && user) {
    return (
      <div>
        <br />
        <ViewUser user={user} />
      </div>
    );
  } else {
    return null;
  }
};

export default Profile;
