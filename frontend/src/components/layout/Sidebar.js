import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Card } from 'react-bootstrap';
// Siderbar Link Data
import { home, dashboard, syllabusManager } from '../routing/sidebarLinkData';

const Sidebar = () => {
  let location = useLocation();

  const sidebarData = () => {
    let path = location.pathname;
    if (path.includes('dashboard')) {
      return dashboard;
    } else if (path.includes('syllabus-manager')) {
      return syllabusManager;
    } else {
      return home;
    }
  };
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
                      <Link to={sit.link}>• {sit.title}</Link>
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </Card.Body>
    </Card>
  );
};

export default Sidebar;
