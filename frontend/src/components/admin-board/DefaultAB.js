import React from 'react';
import { Link } from 'react-router-dom';

// Layout Components
import { iconAdminBoard } from '../layout/Icon';

const DefaultAB = () => {
  return (
    <div>
      <br />
      <h2>
        <strong>{iconAdminBoard} Admin Board</strong>
      </h2>
      <p className='text-muted'>
        Admin Board contains admin specific funality like system infromation,
        edit system, manage user, manage annoucement.
      </p>
      <ul>
        <li>
          <Link to='/admin-board/crud-info'>CRUD Information</Link>
        </li>
        <li>
          <Link to='/admin-board/storage-info'>Storge Information</Link>
        </li>
        <li>
          <Link to='/admin-board/logged-users'>Logged Users</Link>
        </li>
      </ul>
      <ul>
        <li>
          <Link to='/admin-board/edit-config'>Edit Core Config</Link>
        </li>
      </ul>
      <ul>
        <li>
          <Link to='/admin-board/account-request'>Account Request</Link>
        </li>
        <li>
          <Link to='/admin-board/view-user'>View User</Link>
        </li>
        <li>
          <Link to='/admin-board/edit-user'>Edit User</Link>
        </li>
        <li>
          <Link to='/admin-board/delete-user'>Delete User</Link>
        </li>
      </ul>
      <ul>
        <li>
          <Link to='/admin-board/create-announcement'>Create Announcement</Link>
        </li>
        <li>
          <Link to='/admin-board/edit-announcement'>Edit Announcement</Link>
        </li>
        <li>
          <Link to='/admin-board/delete-announcement'>Delete Announcement</Link>
        </li>
      </ul>
    </div>
  );
};

export default DefaultAB;
