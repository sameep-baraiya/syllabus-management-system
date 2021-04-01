import React, { useContext } from 'react';
import { Route } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';

// Login
import LogIn from '../auth/LogIn';

// Page Not Found
import NotFound from '../page/NotFound';

const PrivateRoute = ({ component: Component, role = [], ...rest }) => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, loading, user } = authContext;

  if (!isAuthenticated && !loading) {
    return <Route {...rest} render={() => <LogIn />} />;
  } else {
    if (user) {
      if (!role.includes(user.role)) {
        return <NotFound />;
      }
    }
    return <Route {...rest} render={(props) => <Component {...props} />} />;
  }
};

export default PrivateRoute;
