import { iconHome, iconAbout, iconSubject } from '../layout/Icon';

const home = {
  sidebarTitle: 'Home',
  sidebarLink: [
    {
      title: 'Account Access',
      // TODOD Icon
      titleIcon: iconHome,
      subLink: [
        {
          title: 'Log In',
          link: '/login',
        },
        {
          title: 'Register',
          link: '/register',
        },
      ],
    },
    {
      title: 'More Info',
      titleIcon: iconAbout,
      subLink: [
        {
          title: 'About',
          link: '/about',
        },
      ],
    },
  ],
};

const dashboard = {
  sidebarTitle: 'Dashboard',
  sidebarLink: [
    {
      title: 'Subject',
      titleIcon: iconSubject,
      subLink: [
        {
          title: 'Find Subject',
          link: '/dashboard/subject',
        },
      ],
    },
  ],
};

const syllabusManager = {
  sidebarTitle: 'Syllabus Manager',
  sidebarLink: [
    {
      title: 'Subject',
      titleIcon: iconSubject,
      subLink: [
        {
          title: 'Create Subject',
          link: '/syllabus-manager/subject',
        },
      ],
    },
  ],
};

export { home, dashboard, syllabusManager };
