import React, { Fragment } from 'react';
import { Link, useLocation } from 'react-router-dom';
// Siderbar Link Data
import { home, dashboard, syllabusManager } from '../routing/sidebarLinkData';

// TODO Rework UI
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
    <Fragment>
      <div className='sidebar flex-column'>
        <div className='sidebar-title-div'>
          <div className='sidebar-title'>
            <strong>{sidebarData().sidebarTitle}</strong>
          </div>
        </div>
        <br />
        {sidebarData().sidebarLink &&
          sidebarData().sidebarLink.map((it, index) => (
            <div key={index} className='sidebar-link-div'>
              <div className='sidebar-link-title'>
                {it.titleIcon} {it.title}
              </div>
              {it.subLink.map((sit, sindex) => (
                <div key={sindex} className='sidebar-sublink-div'>
                  <Link
                    className={
                      location.pathname === sit.link
                        ? 'sidebar-sublink-link active'
                        : 'sidebar-sublink-link'
                    }
                    to={sit.link}
                  >
                    {sit.title}
                  </Link>
                </div>
              ))}
            </div>
          ))}
      </div>
    </Fragment>
  );
};

export default Sidebar;
