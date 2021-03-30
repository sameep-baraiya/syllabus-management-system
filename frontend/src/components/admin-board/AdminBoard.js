import React from 'react';
import { Switch, Route } from 'react-router-dom';

// Admin Board Componets
import CRUDInfo from './CRUDInfo';
import StorageInfo from './StorageInfo';
import LoggedUsers from './LoggedUsers';
import EditCoreConfig from './EditCoreConfig';
import AccountRequest from './AccountRequest';

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
      <PrivateRoute exact path='/admin-board/crud-info' component={CRUDInfo} />
      <PrivateRoute
        exact
        path='/admin-board/storage-info'
        component={StorageInfo}
      />
      <PrivateRoute
        exact
        path='/admin-board/logged-users'
        component={LoggedUsers}
      />
      <PrivateRoute
        exact
        path='/admin-board/edit-config'
        component={EditCoreConfig}
      />
      <PrivateRoute
        exact
        path='/admin-board/account-request'
        component={AccountRequest}
      />
      <Route component={NotFound} />
    </Switch>
  );
};

export default AdminBoard;
