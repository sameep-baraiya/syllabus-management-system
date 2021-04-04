import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Card } from 'react-bootstrap';

// Siderbar Link Data
import {
  home,
  dashboard,
  syllabusManager,
  adminBoard,
} from '../routing/sidebarLinkData';

// Context
import AuthContext from '../../context/auth/authContext';

const Sidebar = () => {
  let location = useLocation();

  const authContext = useContext(AuthContext);
  const { isAuthenticated, user } = authContext;

  const sidebarData = () => {
    let path = location.pathname;
    if (isAuthenticated) {
      if (user) {
        if (path.includes('dashboard')) {
          return dashboard;
        } else if (
          path.includes('syllabus-manager') &&
          (user.role === 'syllabus-manager' || user.role === 'admin')
        ) {
          return syllabusManager;
        } else if (path.includes('admin-board') && user.role === 'admin') {
          return adminBoard;
        } else if (path.includes('announcement')) {
          return null;
        }
      }
    }
    return home;
  };

  if (sidebarData()) {
    return (
      <Card className='m-2'>
        <Card.Body>
          <div className='sidebar flex-column'>
            <h2>
              <strong>{sidebarData().sidebarTitle}</strong>
            </h2>
            <br />
            {sidebarData().sidebarLink &&
              sidebarData().sidebarLink.map((it, index) => (
                <div key={index}>
                  <div className='h6 mt-3'>
                    <strong>
                      {it.titleIcon} {it.title}
                    </strong>
                  </div>
                  <div>
                    {it.subLink.map((sit, sindex) => (
                      <div key={sindex}>
                        <Link
                          to={sit.link}
                          className={sit.isDanger && 'text-danger'}
                        >
                          • {sit.title}
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </Card.Body>
      </Card>
    );
  } else {
    return null;
  }
};

export default Sidebar;
