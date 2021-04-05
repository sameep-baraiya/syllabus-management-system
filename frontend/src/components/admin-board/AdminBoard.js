import React from 'react';
import { Switch, Route } from 'react-router-dom';

// Admin Board Componets
import CRUDInfo from './CRUDInfo';
import StorageInfo from './StorageInfo';
import EditCoreConfig from './EditCoreConfig';

// Admin Board User Sub Componets
import LoggedUsers from './user/LoggedUsers';
import AccountRequest from './user/AccountRequest';
import ABFindUser from './user/ABFindUser';
import ABEditUser from './user/ABEditUser';
import ABDeleteUser from './user/ABDeleteUser';

// Admin Board Announcement Sub Componets
import ABCreateAnnouncement from './announcement/ABCreateAnnouncement';
import ABEditAnnouncement from './announcement/ABEditAnnouncement';
import ABDeleteAnnouncement from './announcement/ABDeleteAnnouncement';

// Default Admin Board Page
import DefaultAB from './DefaultAB';

// Page Componets
import NotFound from '../page/NotFound';

const AdminBoard = () => {
  return (
    <Switch>
      <Route exact path='/admin-board/' component={DefaultAB} />
      <Route exact path='/admin-board/crud-info' component={CRUDInfo} />
      <Route exact path='/admin-board/storage-info' component={StorageInfo} />
      <Route exact path='/admin-board/logged-users' component={LoggedUsers} />
      <Route exact path='/admin-board/view-user' component={ABFindUser} />
      <Route exact path='/admin-board/edit-user' component={ABEditUser} />
      <Route exact path='/admin-board/delete-user' component={ABDeleteUser} />
      <Route exact path='/admin-board/edit-config' component={EditCoreConfig} />
      <Route
        exact
        path='/admin-board/account-request'
        component={AccountRequest}
      />
      <Route
        exact
        path='/admin-board/create-announcement'
        component={ABCreateAnnouncement}
      />
      <Route
        exact
        path='/admin-board/edit-announcement'
        component={ABEditAnnouncement}
      />
      <Route
        exact
        path='/admin-board/delete-announcement'
        component={ABDeleteAnnouncement}
      />
      <Route component={NotFound} />
    </Switch>
  );
};

export default AdminBoard;
