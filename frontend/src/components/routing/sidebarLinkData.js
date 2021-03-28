import {
  iconHome,
  iconAbout,
  iconSubject,
  iconCourse,
  iconAcademicBatch,
  iconMeeting,
  iconFileGen,
  iconSystemInfo,
} from '../layout/Icon';

const home = {
  sidebarTitle: 'Home',
  sidebarLink: [
    {
      title: 'Account Access',
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
    {
      title: 'Course',
      titleIcon: iconCourse,
      subLink: [
        {
          title: 'Find Course',
          link: '/dashboard/course',
        },
      ],
    },
    {
      title: 'Academic Batch',
      titleIcon: iconAcademicBatch,
      subLink: [
        {
          title: 'Find Academic Batch',
          link: '/dashboard/academic-batch',
        },
      ],
    },
    {
      title: 'Meeting',
      titleIcon: iconMeeting,
      subLink: [
        {
          title: 'Find Meeting',
          link: '/dashboard/meeting',
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
        {
          title: 'Edit Subject',
          link: '/syllabus-manager/subject/edit',
        },
        {
          title: 'Delete Subject',
          link: '/syllabus-manager/subject/delete',
          isDanger: true,
        },
      ],
    },
    {
      title: 'Academic Batch',
      titleIcon: iconAcademicBatch,
      subLink: [
        {
          title: 'Create Academic Batch',
          link: '/syllabus-manager/academic-batch',
        },
        {
          title: 'Edit Academic Batch',
          link: '/syllabus-manager/academic-batch/edit',
        },
        {
          title: 'Delete Academic Batch',
          link: '/syllabus-manager/academic-batch/delete',
          isDanger: true,
        },
      ],
    },
    {
      title: 'Files',
      titleIcon: iconFileGen,
      subLink: [
        {
          title: 'Create Files',
          link: '/syllabus-manager/academic-batch/create-file',
        },
      ],
    },
    {
      title: 'Course',
      titleIcon: iconCourse,
      subLink: [
        {
          title: 'Create Course',
          link: '/syllabus-manager/course',
        },
        {
          title: 'Edit Course',
          link: '/syllabus-manager/course/edit',
        },
        {
          title: 'Delete Course',
          link: '/syllabus-manager/course/delete',
          isDanger: true,
        },
      ],
    },
    {
      title: 'Meeting',
      titleIcon: iconMeeting,
      subLink: [
        {
          title: 'Create Meeting',
          link: '/syllabus-manager/meeting',
        },
        {
          title: 'Edit Meeting',
          link: '/syllabus-manager/meeting/edit',
        },
        {
          title: 'Delete Meeting',
          link: '/syllabus-manager/meeting/delete',
          isDanger: true,
        },
      ],
    },
  ],
};

const adminBoard = {
  sidebarTitle: 'Admin Board',
  sidebarLink: [
    {
      title: 'System Info',
      titleIcon: iconSystemInfo,
      subLink: [
        {
          title: 'CRUD Information',
          link: '/admin-board/crud-info',
        },
        {
          title: 'Storge Information',
          link: '/admin-board/storage-info',
        },
      ],
    },
  ],
};

export { home, dashboard, syllabusManager, adminBoard };
