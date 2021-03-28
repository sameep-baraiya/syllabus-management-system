import React from 'react';
import { Switch, Route } from 'react-router-dom';

// Default Admin Board Page
import DefaultAB from './DefaultAB';

// Routing Componets
import PrivateRoute from '../routing/PrivateRoute';

// Page Componets
import NotFound from '../page/NotFound';

const AdminBoard = () => {
  return (
    <Switch>
      <PrivateRoute exact path='/admin-board/' component={DefaultAB} />
      <Route component={NotFound} />
    </Switch>
  );
};

export default AdminBoard;
