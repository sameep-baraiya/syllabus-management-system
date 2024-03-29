const headTemp = {
  headMasters: [
    'Lecture',
    'Tutorial',
    'Practical',
    'L+T',
    'P',
    'Total CS',
    'Theory',
    'Sessional',
    'Practical',
    'Term Work',
    'Total ES',
  ],
  headGroups: ['Teaching Scheme', 'Credit Structure', 'Exam Scheme'],
  headGroupsLength: [3, 3, 5],
};

const subjects = [
  // Sem 1
  {
    subjectCode: 'AF 111',
    subjectName: 'MATHEMATICS - I',
    subjectShort: 'MATHS-1',
    headMasterJSON: {
      ...headTemp,
      points: [4, 0, 0, 4, 0, 4, 60, 40, 0, 0, 100],
    },
    subjectType: 'Subject Type 1',
    department: 'IT - Information Technology',
    updateNo: 0,
    isElective: false,
    semNo: 1,
    listIndex: 1,
    isFreezed: false,
    crudInfo: {
      type: 'SUBJECT_CREATE',
      by: 'Script Manger User',
    },
    theoryFile: {
      name: 'Test Theory-1615530125925.pdf',
      path: 'uploads/Subjects/Test Theory-1615530125925.pdf',
    },
    practicalFile: {
      name: 'Test Practical-1615530125925.pdf',
      path: 'uploads/Subjects/Test Practical-1615530125925.pdf',
    },
    noOfFiles: 1,
    files: [
      {
        name: 'Test Theory-1615530125925.pdf',
        path: 'uploads/Subjects/Test Theory-1615530125925.pdf',
      },
    ],
  },
  {
    subjectCode: 'AF 115',
    subjectName: 'ENGINEERING GRAPHICS',
    subjectShort: 'EG',
    headMasterJSON: {
      ...headTemp,
      points: [4, 0, 3, 4, 1.5, 5.5, 60, 40, 0, 50, 150],
    },
    subjectType: 'Subject Type 1',
    department: 'IT - Information Technology',
    updateNo: 0,
    isElective: false,
    semNo: 1,
    listIndex: 2,
    isFreezed: false,
    crudInfo: {
      type: 'SUBJECT_CREATE',
      by: 'Script Manger User',
    },
    theoryFile: {
      name: 'Test Theory-1615530125925.pdf',
      path: 'uploads/Subjects/Test Theory-1615530125925.pdf',
    },
    practicalFile: {
      name: 'Test Practical-1615530125925.pdf',
      path: 'uploads/Subjects/Test Practical-1615530125925.pdf',
    },
    noOfFiles: 1,
    files: [
      {
        name: 'Test Theory-1615530125925.pdf',
        path: 'uploads/Subjects/Test Theory-1615530125925.pdf',
      },
    ],
  },
  {
    subjectCode: 'AF 122',
    subjectName: 'BASIC ELECTRICAL & ELECTRONICS ENGINEERING',
    subjectShort: 'BEEE',
    headMasterJSON: {
      ...headTemp,
      points: [4, 0, 2, 4, 1, 5, 60, 40, 25, 25, 150],
    },
    subjectType: 'Subject Type 1',
    department: 'IT - Information Technology',
    updateNo: 0,
    isElective: false,
    semNo: 1,
    listIndex: 3,
    isFreezed: false,
    crudInfo: {
      type: 'SUBJECT_CREATE',
      by: 'Script Manger User',
    },
    theoryFile: {
      name: 'Test Theory-1615530125925.pdf',
      path: 'uploads/Subjects/Test Theory-1615530125925.pdf',
    },
    practicalFile: {
      name: 'Test Practical-1615530125925.pdf',
      path: 'uploads/Subjects/Test Practical-1615530125925.pdf',
    },
    noOfFiles: 1,
    files: [
      {
        name: 'Test Theory-1615530125925.pdf',
        path: 'uploads/Subjects/Test Theory-1615530125925.pdf',
      },
    ],
  },
  {
    subjectCode: 'AF 124',
    subjectName: 'ENGINEERING MECHANICS',
    subjectShort: 'EM',
    headMasterJSON: {
      ...headTemp,
      points: [3, 0, 1, 3, 0.5, 3.5, 60, 40, 25, 25, 150],
    },
    subjectType: 'Subject Type 1',
    department: 'IT - Information Technology',
    updateNo: 0,
    isElective: false,
    semNo: 1,
    listIndex: 4,
    isFreezed: false,
    crudInfo: {
      type: 'SUBJECT_CREATE',
      by: 'Script Manger User',
    },
    theoryFile: {
      name: 'Test Theory-1615530125925.pdf',
      path: 'uploads/Subjects/Test Theory-1615530125925.pdf',
    },
    practicalFile: {
      name: 'Test Practical-1615530125925.pdf',
      path: 'uploads/Subjects/Test Practical-1615530125925.pdf',
    },
    noOfFiles: 1,
    files: [
      {
        name: 'Test Theory-1615530125925.pdf',
        path: 'uploads/Subjects/Test Theory-1615530125925.pdf',
      },
    ],
  },
  {
    subjectCode: 'AF 126',
    subjectName: 'WORK SHOP - I',
    subjectShort: 'WS-1',
    headMasterJSON: {
      ...headTemp,
      points: [0, 0, 3, 0, 1.5, 1.5, 0, 0, 0, 50, 50],
    },
    subjectType: 'Subject Type 1',
    department: 'IT - Information Technology',
    updateNo: 0,
    isElective: false,
    semNo: 1,
    listIndex: 5,
    isFreezed: false,
    crudInfo: {
      type: 'SUBJECT_CREATE',
      by: 'Script Manger User',
    },
    theoryFile: {
      name: 'Test Theory-1615530125925.pdf',
      path: 'uploads/Subjects/Test Theory-1615530125925.pdf',
    },
    practicalFile: {
      name: 'Test Practical-1615530125925.pdf',
      path: 'uploads/Subjects/Test Practical-1615530125925.pdf',
    },
    noOfFiles: 1,
    files: [
      {
        name: 'Test Theory-1615530125925.pdf',
        path: 'uploads/Subjects/Test Theory-1615530125925.pdf',
      },
    ],
  },
  {
    subjectCode: 'CT 116',
    subjectName: 'ELEMENT OF LINUX OS & C PROGRAMMING - I',
    subjectShort: 'ELCP',
    headMasterJSON: {
      ...headTemp,
      points: [4, 0, 2, 4, 1, 5, 60, 40, 25, 25, 150],
    },
    subjectType: 'Subject Type 1',
    department: 'IT - Information Technology',
    updateNo: 0,
    isElective: false,
    semNo: 1,
    listIndex: 6,
    isFreezed: false,
    crudInfo: {
      type: 'SUBJECT_CREATE',
      by: 'Script Manger User',
    },
    theoryFile: {
      name: 'Test Theory-1615530125925.pdf',
      path: 'uploads/Subjects/Test Theory-1615530125925.pdf',
    },
    practicalFile: {
      name: 'Test Practical-1615530125925.pdf',
      path: 'uploads/Subjects/Test Practical-1615530125925.pdf',
    },
    noOfFiles: 1,
    files: [
      {
        name: 'Test Theory-1615530125925.pdf',
        path: 'uploads/Subjects/Test Theory-1615530125925.pdf',
      },
    ],
  },
  {
    subjectCode: 'ES 110',
    subjectName: 'ENVIRONMENTAL SCIENCE',
    subjectShort: 'ES',
    headMasterJSON: {
      ...headTemp,
      points: [3, 0, 0, 3, 0, 3, 60, 0, 40, 0, 100],
    },
    subjectType: 'Subject Type 1',
    department: 'IT - Information Technology',
    updateNo: 0,
    isElective: false,
    semNo: 1,
    listIndex: 7,
    isFreezed: false,
    crudInfo: {
      type: 'SUBJECT_CREATE',
      by: 'Script Manger User',
    },
    theoryFile: {
      name: 'Test Theory-1615530125925.pdf',
      path: 'uploads/Subjects/Test Theory-1615530125925.pdf',
    },
    practicalFile: {
      name: 'Test Practical-1615530125925.pdf',
      path: 'uploads/Subjects/Test Practical-1615530125925.pdf',
    },
    noOfFiles: 1,
    files: [
      {
        name: 'Test Theory-1615530125925.pdf',
        path: 'uploads/Subjects/Test Theory-1615530125925.pdf',
      },
    ],
  },
  // Sem 2
  {
    subjectCode: 'AF 201',
    subjectName: 'MATHEMATICS - II',
    subjectShort: 'MATHS-2',
    headMasterJSON: {
      ...headTemp,
      points: [4, 0, 0, 4, 0, 4, 60, 40, 0, 0, 100],
    },
    subjectType: 'Subject Type 1',
    department: 'IT - Information Technology',
    updateNo: 0,
    isElective: false,
    semNo: 2,
    listIndex: 1,
    isFreezed: false,
    crudInfo: {
      type: 'SUBJECT_CREATE',
      by: 'Script Manger User',
    },
    theoryFile: {
      name: 'Test Theory-1615530125925.pdf',
      path: 'uploads/Subjects/Test Theory-1615530125925.pdf',
    },
    practicalFile: {
      name: 'Test Practical-1615530125925.pdf',
      path: 'uploads/Subjects/Test Practical-1615530125925.pdf',
    },
    noOfFiles: 1,
    files: [
      {
        name: 'Test Theory-1615530125925.pdf',
        path: 'uploads/Subjects/Test Theory-1615530125925.pdf',
      },
    ],
  },
  {
    subjectCode: 'AF 212',
    subjectName: 'ELECTRONICS PRINCIPLES',
    subjectShort: 'EP',
    headMasterJSON: {
      ...headTemp,
      points: [4, 0, 2, 4, 1, 5, 60, 40, 25, 25, 150],
    },
    subjectType: 'Subject Type 1',
    department: 'IT - Information Technology',
    updateNo: 0,
    isElective: false,
    semNo: 2,
    listIndex: 2,
    isFreezed: false,
    crudInfo: {
      type: 'SUBJECT_CREATE',
      by: 'Script Manger User',
    },
    theoryFile: {
      name: 'Test Theory-1615530125925.pdf',
      path: 'uploads/Subjects/Test Theory-1615530125925.pdf',
    },
    practicalFile: {
      name: 'Test Practical-1615530125925.pdf',
      path: 'uploads/Subjects/Test Practical-1615530125925.pdf',
    },
    noOfFiles: 1,
    files: [
      {
        name: 'Test Theory-1615530125925.pdf',
        path: 'uploads/Subjects/Test Theory-1615530125925.pdf',
      },
    ],
  },
  {
    subjectCode: 'AF 214',
    subjectName: 'MECHANICS OF SOLIDS',
    subjectShort: 'MOS',
    headMasterJSON: {
      ...headTemp,
      points: [3, 0, 2, 3, 1, 4, 60, 40, 25, 25, 150],
    },
    subjectType: 'Subject Type 1',
    department: 'IT - Information Technology',
    updateNo: 0,
    isElective: false,
    semNo: 2,
    listIndex: 3,
    isFreezed: false,
    crudInfo: {
      type: 'SUBJECT_CREATE',
      by: 'Script Manger User',
    },
    theoryFile: {
      name: 'Test Theory-1615530125925.pdf',
      path: 'uploads/Subjects/Test Theory-1615530125925.pdf',
    },
    practicalFile: {
      name: 'Test Practical-1615530125925.pdf',
      path: 'uploads/Subjects/Test Practical-1615530125925.pdf',
    },
    noOfFiles: 1,
    files: [
      {
        name: 'Test Theory-1615530125925.pdf',
        path: 'uploads/Subjects/Test Theory-1615530125925.pdf',
      },
    ],
  },
  {
    subjectCode: 'AF 215',
    subjectName: 'HEAT POWER',
    subjectShort: 'HP',
    headMasterJSON: {
      ...headTemp,
      points: [4, 0, 2, 4, 1, 5, 60, 40, 25, 25, 150],
    },
    subjectType: 'Subject Type 1',
    department: 'IT - Information Technology',
    updateNo: 0,
    isElective: false,
    semNo: 2,
    listIndex: 4,
    isFreezed: false,
    crudInfo: {
      type: 'SUBJECT_CREATE',
      by: 'Script Manger User',
    },
    theoryFile: {
      name: 'Test Theory-1615530125925.pdf',
      path: 'uploads/Subjects/Test Theory-1615530125925.pdf',
    },
    practicalFile: {
      name: 'Test Practical-1615530125925.pdf',
      path: 'uploads/Subjects/Test Practical-1615530125925.pdf',
    },
    noOfFiles: 1,
    files: [
      {
        name: 'Test Theory-1615530125925.pdf',
        path: 'uploads/Subjects/Test Theory-1615530125925.pdf',
      },
    ],
  },
  {
    subjectCode: 'AM 210',
    subjectName: 'ENGINEERING ECONOMICS AND PRINCIPLES OF MANAGEMENT',
    subjectShort: 'EEPM',
    headMasterJSON: {
      ...headTemp,
      points: [3, 0, 0, 3, 0, 3, 60, 0, 40, 0, 100],
    },
    subjectType: 'Subject Type 1',
    department: 'IT - Information Technology',
    updateNo: 0,
    isElective: false,
    semNo: 2,
    listIndex: 5,
    isFreezed: false,
    crudInfo: {
      type: 'SUBJECT_CREATE',
      by: 'Script Manger User',
    },
    theoryFile: {
      name: 'Test Theory-1615530125925.pdf',
      path: 'uploads/Subjects/Test Theory-1615530125925.pdf',
    },
    practicalFile: {
      name: 'Test Practical-1615530125925.pdf',
      path: 'uploads/Subjects/Test Practical-1615530125925.pdf',
    },
    noOfFiles: 1,
    files: [
      {
        name: 'Test Theory-1615530125925.pdf',
        path: 'uploads/Subjects/Test Theory-1615530125925.pdf',
      },
    ],
  },
  {
    subjectCode: 'CT 215',
    subjectName: 'C PROGRAMMING - II',
    subjectShort: 'CP-2',
    headMasterJSON: {
      ...headTemp,
      points: [4, 0, 2, 4, 1, 5, 60, 40, 25, 25, 150],
    },
    subjectType: 'Subject Type 1',
    department: 'IT - Information Technology',
    updateNo: 0,
    isElective: false,
    semNo: 2,
    listIndex: 6,
    isFreezed: false,
    crudInfo: {
      type: 'SUBJECT_CREATE',
      by: 'Script Manger User',
    },
    theoryFile: {
      name: 'Test Theory-1615530125925.pdf',
      path: 'uploads/Subjects/Test Theory-1615530125925.pdf',
    },
    practicalFile: {
      name: 'Test Practical-1615530125925.pdf',
      path: 'uploads/Subjects/Test Practical-1615530125925.pdf',
    },
    noOfFiles: 1,
    files: [
      {
        name: 'Test Theory-1615530125925.pdf',
        path: 'uploads/Subjects/Test Theory-1615530125925.pdf',
      },
    ],
  },
  {
    subjectCode: 'CT 216',
    subjectName: 'ELECTRONICS WORKSHOP',
    subjectShort: 'EW-2',
    headMasterJSON: {
      ...headTemp,
      points: [0, 0, 2, 1, 1, 1.5, 0, 0, 0, 50, 50],
    },
    subjectType: 'Subject Type 1',
    department: 'IT - Information Technology',
    updateNo: 0,
    isElective: false,
    semNo: 2,
    listIndex: 7,
    isFreezed: false,
    crudInfo: {
      type: 'SUBJECT_CREATE',
      by: 'Script Manger User',
    },
    theoryFile: {
      name: 'Test Theory-1615530125925.pdf',
      path: 'uploads/Subjects/Test Theory-1615530125925.pdf',
    },
    practicalFile: {
      name: 'Test Practical-1615530125925.pdf',
      path: 'uploads/Subjects/Test Practical-1615530125925.pdf',
    },
    noOfFiles: 1,
    files: [
      {
        name: 'Test Theory-1615530125925.pdf',
        path: 'uploads/Subjects/Test Theory-1615530125925.pdf',
      },
    ],
  },
  // Sem 3
  {
    subjectCode: 'AF 301',
    subjectName: 'MATHEMATICS - III',
    subjectShort: 'MATHS-3',
    headMasterJSON: {
      ...headTemp,
      points: [4, 0, 0, 4, 0, 4, 60, 40, 0, 0, 100],
    },
    subjectType: 'Subject Type 1',
    department: 'IT - Information Technology',
    updateNo: 0,
    isElective: false,
    semNo: 3,
    listIndex: 1,
    isFreezed: false,
    crudInfo: {
      type: 'SUBJECT_CREATE',
      by: 'Script Manger User',
    },
    theoryFile: {
      name: 'Test Theory-1615530125925.pdf',
      path: 'uploads/Subjects/Test Theory-1615530125925.pdf',
    },
    practicalFile: {
      name: 'Test Practical-1615530125925.pdf',
      path: 'uploads/Subjects/Test Practical-1615530125925.pdf',
    },
    noOfFiles: 1,
    files: [
      {
        name: 'Test Theory-1615530125925.pdf',
        path: 'uploads/Subjects/Test Theory-1615530125925.pdf',
      },
    ],
  },
  {
    subjectCode: 'IT 301',
    subjectName: 'DESIGN OF DIGITAL CIRCUITS',
    subjectShort: 'DC',
    headMasterJSON: {
      ...headTemp,
      points: [4, 0, 2, 4, 1, 5, 60, 40, 25, 25, 150],
    },
    subjectType: 'Subject Type 1',
    department: 'IT - Information Technology',
    updateNo: 0,
    isElective: false,
    semNo: 3,
    listIndex: 2,
    isFreezed: false,
    crudInfo: {
      type: 'SUBJECT_CREATE',
      by: 'Script Manger User',
    },
    theoryFile: {
      name: 'Test Theory-1615530125925.pdf',
      path: 'uploads/Subjects/Test Theory-1615530125925.pdf',
    },
    practicalFile: {
      name: 'Test Practical-1615530125925.pdf',
      path: 'uploads/Subjects/Test Practical-1615530125925.pdf',
    },
    noOfFiles: 1,
    files: [
      {
        name: 'Test Theory-1615530125925.pdf',
        path: 'uploads/Subjects/Test Theory-1615530125925.pdf',
      },
    ],
  },
  {
    subjectCode: 'IT 302',
    subjectName: 'COMPUTER PERIPHERALS',
    subjectShort: 'CP',
    headMasterJSON: {
      ...headTemp,
      points: [0, 0, 2, 0, 1, 1, 0, 0, 25, 25, 50],
    },
    subjectType: 'Subject Type 1',
    department: 'IT - Information Technology',
    updateNo: 0,
    isElective: false,
    semNo: 3,
    listIndex: 3,
    isFreezed: false,
    crudInfo: {
      type: 'SUBJECT_CREATE',
      by: 'Script Manger User',
    },
    theoryFile: {
      name: 'Test Theory-1615530125925.pdf',
      path: 'uploads/Subjects/Test Theory-1615530125925.pdf',
    },
    practicalFile: {
      name: 'Test Practical-1615530125925.pdf',
      path: 'uploads/Subjects/Test Practical-1615530125925.pdf',
    },
    noOfFiles: 1,
    files: [
      {
        name: 'Test Theory-1615530125925.pdf',
        path: 'uploads/Subjects/Test Theory-1615530125925.pdf',
      },
    ],
  },
  {
    subjectCode: 'IT 303',
    subjectName: 'OBJECT ORIENTED PROGRAMMING',
    subjectShort: 'OOP',
    headMasterJSON: {
      ...headTemp,
      points: [4, 0, 2, 4, 1, 5, 60, 40, 25, 25, 150],
    },
    subjectType: 'Subject Type 1',
    department: 'IT - Information Technology',
    updateNo: 0,
    isElective: false,
    semNo: 3,
    listIndex: 4,
    isFreezed: false,
    crudInfo: {
      type: 'SUBJECT_CREATE',
      by: 'Script Manger User',
    },
    theoryFile: {
      name: 'Test Theory-1615530125925.pdf',
      path: 'uploads/Subjects/Test Theory-1615530125925.pdf',
    },
    practicalFile: {
      name: 'Test Practical-1615530125925.pdf',
      path: 'uploads/Subjects/Test Practical-1615530125925.pdf',
    },
    noOfFiles: 1,
    files: [
      {
        name: 'Test Theory-1615530125925.pdf',
        path: 'uploads/Subjects/Test Theory-1615530125925.pdf',
      },
    ],
  },
  {
    subjectCode: 'IT 304',
    subjectName: 'DISCRETE MATHEMATICS',
    subjectShort: 'DM',
    headMasterJSON: {
      ...headTemp,
      points: [4, 0, 2, 4, 1, 5, 60, 40, 25, 25, 150],
    },
    subjectType: 'Subject Type 1',
    department: 'IT - Information Technology',
    updateNo: 0,
    isElective: false,
    semNo: 3,
    listIndex: 5,
    isFreezed: false,
    crudInfo: {
      type: 'SUBJECT_CREATE',
      by: 'Script Manger User',
    },
    theoryFile: {
      name: 'Test Theory-1615530125925.pdf',
      path: 'uploads/Subjects/Test Theory-1615530125925.pdf',
    },
    practicalFile: {
      name: 'Test Practical-1615530125925.pdf',
      path: 'uploads/Subjects/Test Practical-1615530125925.pdf',
    },
    noOfFiles: 1,
    files: [
      {
        name: 'Test Theory-1615530125925.pdf',
        path: 'uploads/Subjects/Test Theory-1615530125925.pdf',
      },
    ],
  },
  {
    subjectCode: 'IT 305',
    subjectName: 'COMMUNICATION SYSTEMS',
    subjectShort: 'CS',
    headMasterJSON: {
      ...headTemp,
      points: [4, 0, 2, 4, 1, 5, 60, 40, 25, 25, 150],
    },
    subjectType: 'Subject Type 1',
    department: 'IT - Information Technology',
    updateNo: 0,
    isElective: false,
    semNo: 3,
    listIndex: 6,
    isFreezed: false,
    crudInfo: {
      type: 'SUBJECT_CREATE',
      by: 'Script Manger User',
    },
    theoryFile: {
      name: 'Test Theory-1615530125925.pdf',
      path: 'uploads/Subjects/Test Theory-1615530125925.pdf',
    },
    practicalFile: {
      name: 'Test Practical-1615530125925.pdf',
      path: 'uploads/Subjects/Test Practical-1615530125925.pdf',
    },
    noOfFiles: 1,
    files: [
      {
        name: 'Test Theory-1615530125925.pdf',
        path: 'uploads/Subjects/Test Theory-1615530125925.pdf',
      },
    ],
  },
  // Sem 4
  {
    subjectCode: 'AF 410',
    subjectName: 'FINANCIAL AND MANAGERIAL ACCOUNTING',
    subjectShort: 'FMA',
    headMasterJSON: {
      ...headTemp,
      points: [3, 0, 0, 3, 0, 3, 60, 0, 0, 40, 100],
    },
    subjectType: 'Subject Type 1',
    department: 'IT - Information Technology',
    updateNo: 0,
    isElective: false,
    semNo: 4,
    listIndex: 1,
    isFreezed: false,
    crudInfo: {
      type: 'SUBJECT_CREATE',
      by: 'Script Manger User',
    },
    theoryFile: {
      name: 'Test Theory-1615530125925.pdf',
      path: 'uploads/Subjects/Test Theory-1615530125925.pdf',
    },
    practicalFile: {
      name: 'Test Practical-1615530125925.pdf',
      path: 'uploads/Subjects/Test Practical-1615530125925.pdf',
    },
    noOfFiles: 1,
    files: [
      {
        name: 'Test Theory-1615530125925.pdf',
        path: 'uploads/Subjects/Test Theory-1615530125925.pdf',
      },
    ],
  },
  {
    subjectCode: 'AF 411',
    subjectName: 'MATHEMATICS - IV',
    subjectShort: 'MATHS-4',
    headMasterJSON: {
      ...headTemp,
      points: [4, 0, 0, 4, 0, 4, 60, 40, 0, 0, 100],
    },
    subjectType: 'Subject Type 1',
    department: 'IT - Information Technology',
    updateNo: 0,
    isElective: false,
    semNo: 4,
    listIndex: 2,
    isFreezed: false,
    crudInfo: {
      type: 'SUBJECT_CREATE',
      by: 'Script Manger User',
    },
    theoryFile: {
      name: 'Test Theory-1615530125925.pdf',
      path: 'uploads/Subjects/Test Theory-1615530125925.pdf',
    },
    practicalFile: {
      name: 'Test Practical-1615530125925.pdf',
      path: 'uploads/Subjects/Test Practical-1615530125925.pdf',
    },
    noOfFiles: 1,
    files: [
      {
        name: 'Test Theory-1615530125925.pdf',
        path: 'uploads/Subjects/Test Theory-1615530125925.pdf',
      },
    ],
  },
  {
    subjectCode: 'IT 402',
    subjectName: 'COMPUTER ORGANIZATION',
    subjectShort: 'CO',
    headMasterJSON: {
      ...headTemp,
      points: [4, 0, 2, 4, 1, 5, 60, 40, 25, 25, 150],
    },
    subjectType: 'Subject Type 1',
    department: 'IT - Information Technology',
    updateNo: 0,
    isElective: false,
    semNo: 4,
    listIndex: 3,
    isFreezed: false,
    crudInfo: {
      type: 'SUBJECT_CREATE',
      by: 'Script Manger User',
    },
    theoryFile: {
      name: 'Test Theory-1615530125925.pdf',
      path: 'uploads/Subjects/Test Theory-1615530125925.pdf',
    },
    practicalFile: {
      name: 'Test Practical-1615530125925.pdf',
      path: 'uploads/Subjects/Test Practical-1615530125925.pdf',
    },
    noOfFiles: 1,
    files: [
      {
        name: 'Test Theory-1615530125925.pdf',
        path: 'uploads/Subjects/Test Theory-1615530125925.pdf',
      },
    ],
  },
  {
    subjectCode: 'IT 403',
    subjectName: 'MICROPROCESSOR ARCHITECTURE PROG. AND INTERFACING',
    subjectShort: 'MAPI',
    headMasterJSON: {
      ...headTemp,
      points: [4, 0, 2, 4, 1, 5, 60, 40, 25, 25, 150],
    },
    subjectType: 'Subject Type 1',
    department: 'IT - Information Technology',
    updateNo: 0,
    isElective: false,
    semNo: 4,
    listIndex: 4,
    isFreezed: false,
    crudInfo: {
      type: 'SUBJECT_CREATE',
      by: 'Script Manger User',
    },
    theoryFile: {
      name: 'Test Theory-1615530125925.pdf',
      path: 'uploads/Subjects/Test Theory-1615530125925.pdf',
    },
    practicalFile: {
      name: 'Test Practical-1615530125925.pdf',
      path: 'uploads/Subjects/Test Practical-1615530125925.pdf',
    },
    noOfFiles: 1,
    files: [
      {
        name: 'Test Theory-1615530125925.pdf',
        path: 'uploads/Subjects/Test Theory-1615530125925.pdf',
      },
    ],
  },
  {
    subjectCode: 'IT 406',
    subjectName: 'DATA STRUCTURES AND ALGORITHMS',
    subjectShort: 'DSA',
    headMasterJSON: {
      ...headTemp,
      points: [4, 0, 2, 4, 1, 5, 60, 40, 25, 25, 150],
    },
    subjectType: 'Subject Type 1',
    department: 'IT - Information Technology',
    updateNo: 0,
    isElective: false,
    semNo: 4,
    listIndex: 5,
    isFreezed: false,
    crudInfo: {
      type: 'SUBJECT_CREATE',
      by: 'Script Manger User',
    },
    theoryFile: {
      name: 'Test Theory-1615530125925.pdf',
      path: 'uploads/Subjects/Test Theory-1615530125925.pdf',
    },
    practicalFile: {
      name: 'Test Practical-1615530125925.pdf',
      path: 'uploads/Subjects/Test Practical-1615530125925.pdf',
    },
    noOfFiles: 1,
    files: [
      {
        name: 'Test Theory-1615530125925.pdf',
        path: 'uploads/Subjects/Test Theory-1615530125925.pdf',
      },
    ],
  },
  {
    subjectCode: 'IT 407',
    subjectName: 'COMPUTER AND COMMUNICATION NETWORK',
    subjectShort: 'CCN',
    headMasterJSON: {
      ...headTemp,
      points: [4, 0, 2, 4, 1, 5, 60, 40, 25, 25, 150],
    },
    subjectType: 'Subject Type 1',
    department: 'IT - Information Technology',
    updateNo: 0,
    isElective: false,
    semNo: 4,
    listIndex: 6,
    isFreezed: false,
    crudInfo: {
      type: 'SUBJECT_CREATE',
      by: 'Script Manger User',
    },
    theoryFile: {
      name: 'Test Theory-1615530125925.pdf',
      path: 'uploads/Subjects/Test Theory-1615530125925.pdf',
    },
    practicalFile: {
      name: 'Test Practical-1615530125925.pdf',
      path: 'uploads/Subjects/Test Practical-1615530125925.pdf',
    },
    noOfFiles: 1,
    files: [
      {
        name: 'Test Theory-1615530125925.pdf',
        path: 'uploads/Subjects/Test Theory-1615530125925.pdf',
      },
    ],
  },
  // Sem 5
  {
    subjectCode: 'AF 501',
    subjectName: 'PROFESSIONAL COMMUNICATION - I',
    subjectShort: 'PC-1',
    headMasterJSON: {
      ...headTemp,
      points: [1, 0, 2, 1, 1, 2, 50, 0, 50, 0, 100],
    },
    subjectType: 'Subject Type 1',
    department: 'IT - Information Technology',
    updateNo: 0,
    isElective: false,
    semNo: 5,
    listIndex: 1,
    isFreezed: false,
    crudInfo: {
      type: 'SUBJECT_CREATE',
      by: 'Script Manger User',
    },
    theoryFile: {
      name: 'Test Theory-1615530125925.pdf',
      path: 'uploads/Subjects/Test Theory-1615530125925.pdf',
    },
    practicalFile: {
      name: 'Test Practical-1615530125925.pdf',
      path: 'uploads/Subjects/Test Practical-1615530125925.pdf',
    },
    noOfFiles: 1,
    files: [
      {
        name: 'Test Theory-1615530125925.pdf',
        path: 'uploads/Subjects/Test Theory-1615530125925.pdf',
      },
    ],
  },
  {
    subjectCode: 'IT 502',
    subjectName: 'DATABASE MANAGEMENT SYSTEM',
    subjectShort: 'DBMS',
    headMasterJSON: {
      ...headTemp,
      points: [4, 0, 2, 4, 1, 5, 60, 40, 25, 25, 150],
    },
    subjectType: 'Subject Type 1',
    department: 'IT - Information Technology',
    updateNo: 0,
    isElective: false,
    semNo: 5,
    listIndex: 2,
    isFreezed: false,
    crudInfo: {
      type: 'SUBJECT_CREATE',
      by: 'Script Manger User',
    },
    theoryFile: {
      name: 'Test Theory-1615530125925.pdf',
      path: 'uploads/Subjects/Test Theory-1615530125925.pdf',
    },
    practicalFile: {
      name: 'Test Practical-1615530125925.pdf',
      path: 'uploads/Subjects/Test Practical-1615530125925.pdf',
    },
    noOfFiles: 1,
    files: [
      {
        name: 'Test Theory-1615530125925.pdf',
        path: 'uploads/Subjects/Test Theory-1615530125925.pdf',
      },
    ],
  },
  {
    subjectCode: 'IT 509',
    subjectName: 'DESIGN & ANALYSIS OF ALGORITHM',
    subjectShort: 'DAA',
    headMasterJSON: {
      ...headTemp,
      points: [4, 0, 2, 4, 1, 5, 60, 40, 25, 25, 150],
    },
    subjectType: 'Subject Type 1',
    department: 'IT - Information Technology',
    updateNo: 0,
    isElective: false,
    semNo: 5,
    listIndex: 3,
    isFreezed: false,
    crudInfo: {
      type: 'SUBJECT_CREATE',
      by: 'Script Manger User',
    },
    theoryFile: {
      name: 'Test Theory-1615530125925.pdf',
      path: 'uploads/Subjects/Test Theory-1615530125925.pdf',
    },
    practicalFile: {
      name: 'Test Practical-1615530125925.pdf',
      path: 'uploads/Subjects/Test Practical-1615530125925.pdf',
    },
    noOfFiles: 1,
    files: [
      {
        name: 'Test Theory-1615530125925.pdf',
        path: 'uploads/Subjects/Test Theory-1615530125925.pdf',
      },
    ],
  },
  {
    subjectCode: 'IT 510',
    subjectName: 'CORE JAVA TECHNOLOGY',
    subjectShort: 'CJT',
    headMasterJSON: {
      ...headTemp,
      points: [4, 0, 2, 4, 1, 5, 60, 40, 25, 25, 150],
    },
    subjectType: 'Subject Type 1',
    department: 'IT - Information Technology',
    updateNo: 0,
    isElective: false,
    semNo: 5,
    listIndex: 4,
    isFreezed: false,
    crudInfo: {
      type: 'SUBJECT_CREATE',
      by: 'Script Manger User',
    },
    theoryFile: {
      name: 'Test Theory-1615530125925.pdf',
      path: 'uploads/Subjects/Test Theory-1615530125925.pdf',
    },
    practicalFile: {
      name: 'Test Practical-1615530125925.pdf',
      path: 'uploads/Subjects/Test Practical-1615530125925.pdf',
    },
    noOfFiles: 1,
    files: [
      {
        name: 'Test Theory-1615530125925.pdf',
        path: 'uploads/Subjects/Test Theory-1615530125925.pdf',
      },
    ],
  },
  {
    subjectCode: 'IT 511',
    subjectName: 'THEORY OF AUTOMATA & FORMAL LANGUAGE',
    subjectShort: 'TAFL',
    headMasterJSON: {
      ...headTemp,
      points: [4, 0, 0, 4, 0, 4, 60, 40, 0, 0, 100],
    },
    subjectType: 'Subject Type 1',
    department: 'IT - Information Technology',
    updateNo: 0,
    isElective: false,
    semNo: 5,
    listIndex: 5,
    isFreezed: false,
    crudInfo: {
      type: 'SUBJECT_CREATE',
      by: 'Script Manger User',
    },
    theoryFile: {
      name: 'Test Theory-1615530125925.pdf',
      path: 'uploads/Subjects/Test Theory-1615530125925.pdf',
    },
    practicalFile: {
      name: 'Test Practical-1615530125925.pdf',
      path: 'uploads/Subjects/Test Practical-1615530125925.pdf',
    },
    noOfFiles: 1,
    files: [
      {
        name: 'Test Theory-1615530125925.pdf',
        path: 'uploads/Subjects/Test Theory-1615530125925.pdf',
      },
    ],
  },
  {
    subjectCode: 'IT 506',
    subjectName: 'ADVANCED MICROPROCESSOR ARCHITECTURE',
    subjectShort: 'AMA',
    headMasterJSON: {
      ...headTemp,
      points: [4, 0, 2, 4, 1, 5, 60, 40, 25, 25, 150],
    },
    subjectType: 'Subject Type 1',
    department: 'IT - Information Technology',
    updateNo: 0,
    isElective: true,
    semNo: 5,
    listIndex: 6,
    isFreezed: false,
    crudInfo: {
      type: 'SUBJECT_CREATE',
      by: 'Script Manger User',
    },
    theoryFile: {
      name: 'Test Theory-1615530125925.pdf',
      path: 'uploads/Subjects/Test Theory-1615530125925.pdf',
    },
    practicalFile: {
      name: 'Test Practical-1615530125925.pdf',
      path: 'uploads/Subjects/Test Practical-1615530125925.pdf',
    },
    noOfFiles: 1,
    files: [
      {
        name: 'Test Theory-1615530125925.pdf',
        path: 'uploads/Subjects/Test Theory-1615530125925.pdf',
      },
    ],
  },
  {
    subjectCode: 'IT 506A',
    subjectName: 'EMBEDDED SYSTEM',
    subjectShort: 'ES',
    headMasterJSON: {
      ...headTemp,
      points: [4, 0, 2, 4, 1, 5, 60, 40, 25, 25, 150],
    },
    subjectType: 'Subject Type 1',
    department: 'IT - Information Technology',
    updateNo: 0,
    isElective: true,
    semNo: 5,
    listIndex: 7,
    isFreezed: false,
    crudInfo: {
      type: 'SUBJECT_CREATE',
      by: 'Script Manger User',
    },
    theoryFile: {
      name: 'Test Theory-1615530125925.pdf',
      path: 'uploads/Subjects/Test Theory-1615530125925.pdf',
    },
    practicalFile: {
      name: 'Test Practical-1615530125925.pdf',
      path: 'uploads/Subjects/Test Practical-1615530125925.pdf',
    },
    noOfFiles: 1,
    files: [
      {
        name: 'Test Theory-1615530125925.pdf',
        path: 'uploads/Subjects/Test Theory-1615530125925.pdf',
      },
    ],
  },
  // Sem 6
  {
    subjectCode: 'CT 616',
    subjectName: 'SOFTWARE ENGINEERING',
    subjectShort: 'SE',
    headMasterJSON: {
      ...headTemp,
      points: [4, 0, 2, 4, 1, 5, 60, 40, 25, 25, 150],
    },
    subjectType: 'Subject Type 1',
    department: 'IT - Information Technology',
    updateNo: 0,
    isElective: false,
    semNo: 6,
    listIndex: 1,
    isFreezed: false,
    crudInfo: {
      type: 'SUBJECT_CREATE',
      by: 'Script Manger User',
    },
    theoryFile: {
      name: 'Test Theory-1615530125925.pdf',
      path: 'uploads/Subjects/Test Theory-1615530125925.pdf',
    },
    practicalFile: {
      name: 'Test Practical-1615530125925.pdf',
      path: 'uploads/Subjects/Test Practical-1615530125925.pdf',
    },
    noOfFiles: 1,
    files: [
      {
        name: 'Test Theory-1615530125925.pdf',
        path: 'uploads/Subjects/Test Theory-1615530125925.pdf',
      },
    ],
  },
  {
    subjectCode: 'IT 607',
    subjectName: 'APPLIED OPERATING SYSTEM',
    subjectShort: 'AOS',
    headMasterJSON: {
      ...headTemp,
      points: [4, 0, 2, 4, 1, 5, 60, 40, 25, 25, 150],
    },
    subjectType: 'Subject Type 1',
    department: 'IT - Information Technology',
    updateNo: 0,
    isElective: false,
    semNo: 6,
    listIndex: 2,
    isFreezed: false,
    crudInfo: {
      type: 'SUBJECT_CREATE',
      by: 'Script Manger User',
    },
    theoryFile: {
      name: 'Test Theory-1615530125925.pdf',
      path: 'uploads/Subjects/Test Theory-1615530125925.pdf',
    },
    practicalFile: {
      name: 'Test Practical-1615530125925.pdf',
      path: 'uploads/Subjects/Test Practical-1615530125925.pdf',
    },
    noOfFiles: 1,
    files: [
      {
        name: 'Test Theory-1615530125925.pdf',
        path: 'uploads/Subjects/Test Theory-1615530125925.pdf',
      },
    ],
  },
  {
    subjectCode: 'IT 608',
    subjectName: 'LANGUAGE TRANSLATOR',
    subjectShort: 'LT',
    headMasterJSON: {
      ...headTemp,
      points: [4, 0, 2, 4, 1, 5, 60, 40, 25, 25, 150],
    },
    subjectType: 'Subject Type 1',
    department: 'IT - Information Technology',
    updateNo: 0,
    isElective: false,
    semNo: 6,
    listIndex: 3,
    isFreezed: false,
    crudInfo: {
      type: 'SUBJECT_CREATE',
      by: 'Script Manger User',
    },
    theoryFile: {
      name: 'Test Theory-1615530125925.pdf',
      path: 'uploads/Subjects/Test Theory-1615530125925.pdf',
    },
    practicalFile: {
      name: 'Test Practical-1615530125925.pdf',
      path: 'uploads/Subjects/Test Practical-1615530125925.pdf',
    },
    noOfFiles: 1,
    files: [
      {
        name: 'Test Theory-1615530125925.pdf',
        path: 'uploads/Subjects/Test Theory-1615530125925.pdf',
      },
    ],
  },
  {
    subjectCode: 'AF 601',
    subjectName: 'PROFESSIONAL COMMUNICATION - II',
    subjectShort: 'PC-2',
    headMasterJSON: {
      ...headTemp,
      points: [1, 0, 2, 1, 1, 2, 50, 0, 50, 0, 100],
    },
    subjectType: 'Subject Type 1',
    department: 'IT - Information Technology',
    updateNo: 0,
    isElective: false,
    semNo: 6,
    listIndex: 4,
    isFreezed: false,
    crudInfo: {
      type: 'SUBJECT_CREATE',
      by: 'Script Manger User',
    },
    theoryFile: {
      name: 'Test Theory-1615530125925.pdf',
      path: 'uploads/Subjects/Test Theory-1615530125925.pdf',
    },
    practicalFile: {
      name: 'Test Practical-1615530125925.pdf',
      path: 'uploads/Subjects/Test Practical-1615530125925.pdf',
    },
    noOfFiles: 1,
    files: [
      {
        name: 'Test Theory-1615530125925.pdf',
        path: 'uploads/Subjects/Test Theory-1615530125925.pdf',
      },
    ],
  },
  {
    subjectCode: 'IT 617',
    subjectName: 'ADVANCED JAVA TECHNOLOGY',
    subjectShort: 'AJT',
    headMasterJSON: {
      ...headTemp,
      points: [4, 0, 2, 4, 1, 5, 60, 40, 25, 25, 150],
    },
    subjectType: 'Subject Type 1',
    department: 'IT - Information Technology',
    updateNo: 0,
    isElective: false,
    semNo: 6,
    listIndex: 5,
    isFreezed: false,
    crudInfo: {
      type: 'SUBJECT_CREATE',
      by: 'Script Manger User',
    },
    theoryFile: {
      name: 'Test Theory-1615530125925.pdf',
      path: 'uploads/Subjects/Test Theory-1615530125925.pdf',
    },
    practicalFile: {
      name: 'Test Practical-1615530125925.pdf',
      path: 'uploads/Subjects/Test Practical-1615530125925.pdf',
    },
    noOfFiles: 1,
    files: [
      {
        name: 'Test Theory-1615530125925.pdf',
        path: 'uploads/Subjects/Test Theory-1615530125925.pdf',
      },
    ],
  },
  {
    subjectCode: 'IT 618',
    subjectName: 'DESIGN PATTERNS AND APPLICATION FRAMEWORKS',
    subjectShort: 'DPAF',
    headMasterJSON: {
      ...headTemp,
      points: [4, 0, 2, 4, 1, 5, 60, 40, 25, 25, 150],
    },
    subjectType: 'Subject Type 1',
    department: 'IT - Information Technology',
    updateNo: 0,
    isElective: true,
    semNo: 6,
    listIndex: 6,
    isFreezed: false,
    crudInfo: {
      type: 'SUBJECT_CREATE',
      by: 'Script Manger User',
    },
    theoryFile: {
      name: 'Test Theory-1615530125925.pdf',
      path: 'uploads/Subjects/Test Theory-1615530125925.pdf',
    },
    practicalFile: {
      name: 'Test Practical-1615530125925.pdf',
      path: 'uploads/Subjects/Test Practical-1615530125925.pdf',
    },
    noOfFiles: 1,
    files: [
      {
        name: 'Test Theory-1615530125925.pdf',
        path: 'uploads/Subjects/Test Theory-1615530125925.pdf',
      },
    ],
  },
  {
    subjectCode: 'IT 618A',
    subjectName: 'MOBILE COMPUTING',
    subjectShort: 'MC',
    headMasterJSON: {
      ...headTemp,
      points: [4, 0, 2, 4, 1, 5, 60, 40, 25, 25, 150],
    },
    subjectType: 'Subject Type 1',
    department: 'IT - Information Technology',
    updateNo: 0,
    isElective: true,
    semNo: 6,
    listIndex: 7,
    isFreezed: false,
    crudInfo: {
      type: 'SUBJECT_CREATE',
      by: 'Script Manger User',
    },
    theoryFile: {
      name: 'Test Theory-1615530125925.pdf',
      path: 'uploads/Subjects/Test Theory-1615530125925.pdf',
    },
    practicalFile: {
      name: 'Test Practical-1615530125925.pdf',
      path: 'uploads/Subjects/Test Practical-1615530125925.pdf',
    },
    noOfFiles: 1,
    files: [
      {
        name: 'Test Theory-1615530125925.pdf',
        path: 'uploads/Subjects/Test Theory-1615530125925.pdf',
      },
    ],
  },
  {
    subjectCode: 'IT 618B',
    subjectName: 'COMPUTER GRAPHICS',
    subjectShort: 'CG',
    headMasterJSON: {
      ...headTemp,
      points: [4, 0, 2, 4, 1, 5, 60, 40, 25, 25, 150],
    },
    subjectType: 'Subject Type 1',
    department: 'IT - Information Technology',
    updateNo: 0,
    isElective: true,
    semNo: 6,
    listIndex: 8,
    isFreezed: false,
    crudInfo: {
      type: 'SUBJECT_CREATE',
      by: 'Script Manger User',
    },
    theoryFile: {
      name: 'Test Theory-1615530125925.pdf',
      path: 'uploads/Subjects/Test Theory-1615530125925.pdf',
    },
    practicalFile: {
      name: 'Test Practical-1615530125925.pdf',
      path: 'uploads/Subjects/Test Practical-1615530125925.pdf',
    },
    noOfFiles: 1,
    files: [
      {
        name: 'Test Theory-1615530125925.pdf',
        path: 'uploads/Subjects/Test Theory-1615530125925.pdf',
      },
    ],
  },
  {
    subjectCode: 'IT 618C',
    subjectName: 'DIGITAL SWITCHING SYSTEM',
    subjectShort: 'DSS',
    headMasterJSON: {
      ...headTemp,
      points: [4, 0, 2, 4, 1, 5, 60, 40, 25, 25, 150],
    },
    subjectType: 'Subject Type 1',
    department: 'IT - Information Technology',
    updateNo: 0,
    isElective: true,
    semNo: 6,
    listIndex: 9,
    isFreezed: false,
    crudInfo: {
      type: 'SUBJECT_CREATE',
      by: 'Script Manger User',
    },
    theoryFile: {
      name: 'Test Theory-1615530125925.pdf',
      path: 'uploads/Subjects/Test Theory-1615530125925.pdf',
    },
    practicalFile: {
      name: 'Test Practical-1615530125925.pdf',
      path: 'uploads/Subjects/Test Practical-1615530125925.pdf',
    },
    noOfFiles: 1,
    files: [
      {
        name: 'Test Theory-1615530125925.pdf',
        path: 'uploads/Subjects/Test Theory-1615530125925.pdf',
      },
    ],
  },
  // Sem 7
  {
    subjectCode: 'IT 704',
    subjectName: 'DATA ANALYSIS & INFORMATION EXTRACTION',
    subjectShort: 'DAIE',
    headMasterJSON: {
      ...headTemp,
      points: [4, 0, 2, 4, 1, 5, 60, 40, 25, 25, 150],
    },
    subjectType: 'Subject Type 1',
    department: 'IT - Information Technology',
    updateNo: 0,
    isElective: false,
    semNo: 7,
    listIndex: 1,
    isFreezed: false,
    crudInfo: {
      type: 'SUBJECT_CREATE',
      by: 'Script Manger User',
    },
    theoryFile: {
      name: 'Test Theory-1615530125925.pdf',
      path: 'uploads/Subjects/Test Theory-1615530125925.pdf',
    },
    practicalFile: {
      name: 'Test Practical-1615530125925.pdf',
      path: 'uploads/Subjects/Test Practical-1615530125925.pdf',
    },
    noOfFiles: 1,
    files: [
      {
        name: 'Test Theory-1615530125925.pdf',
        path: 'uploads/Subjects/Test Theory-1615530125925.pdf',
      },
    ],
  },
  {
    subjectCode: 'IT 707',
    subjectName: 'SYSTEM DESIGN PRACTICE',
    subjectShort: 'SDP',
    headMasterJSON: {
      ...headTemp,
      points: [0, 0, 2, 0, 1, 1, 0, 0, 25, 25, 50],
    },
    subjectType: 'Subject Type 1',
    department: 'IT - Information Technology',
    updateNo: 0,
    isElective: false,
    semNo: 7,
    listIndex: 2,
    isFreezed: false,
    crudInfo: {
      type: 'SUBJECT_CREATE',
      by: 'Script Manger User',
    },
    theoryFile: {
      name: 'Test Theory-1615530125925.pdf',
      path: 'uploads/Subjects/Test Theory-1615530125925.pdf',
    },
    practicalFile: {
      name: 'Test Practical-1615530125925.pdf',
      path: 'uploads/Subjects/Test Practical-1615530125925.pdf',
    },
    noOfFiles: 1,
    files: [
      {
        name: 'Test Theory-1615530125925.pdf',
        path: 'uploads/Subjects/Test Theory-1615530125925.pdf',
      },
    ],
  },
  {
    subjectCode: 'IT 714',
    subjectName: 'KNOWLEDGE SYSTEM',
    subjectShort: 'KS',
    headMasterJSON: {
      ...headTemp,
      points: [4, 0, 2, 4, 1, 5, 60, 40, 25, 25, 150],
    },
    subjectType: 'Subject Type 1',
    department: 'IT - Information Technology',
    updateNo: 0,
    isElective: false,
    semNo: 7,
    listIndex: 3,
    isFreezed: false,
    crudInfo: {
      type: 'SUBJECT_CREATE',
      by: 'Script Manger User',
    },
    theoryFile: {
      name: 'Test Theory-1615530125925.pdf',
      path: 'uploads/Subjects/Test Theory-1615530125925.pdf',
    },
    practicalFile: {
      name: 'Test Practical-1615530125925.pdf',
      path: 'uploads/Subjects/Test Practical-1615530125925.pdf',
    },
    noOfFiles: 1,
    files: [
      {
        name: 'Test Theory-1615530125925.pdf',
        path: 'uploads/Subjects/Test Theory-1615530125925.pdf',
      },
    ],
  },
  {
    subjectCode: 'IT 717',
    subjectName: 'DISTRIBUTED COMPUTING',
    subjectShort: 'DC',
    headMasterJSON: {
      ...headTemp,
      points: [4, 0, 2, 4, 1, 5, 60, 40, 25, 25, 150],
    },
    subjectType: 'Subject Type 1',
    department: 'IT - Information Technology',
    updateNo: 0,
    isElective: false,
    semNo: 7,
    listIndex: 4,
    isFreezed: false,
    crudInfo: {
      type: 'SUBJECT_CREATE',
      by: 'Script Manger User',
    },
    theoryFile: {
      name: 'Test Theory-1615530125925.pdf',
      path: 'uploads/Subjects/Test Theory-1615530125925.pdf',
    },
    practicalFile: {
      name: 'Test Practical-1615530125925.pdf',
      path: 'uploads/Subjects/Test Practical-1615530125925.pdf',
    },
    noOfFiles: 1,
    files: [
      {
        name: 'Test Theory-1615530125925.pdf',
        path: 'uploads/Subjects/Test Theory-1615530125925.pdf',
      },
    ],
  },
  {
    subjectCode: 'IT 716',
    subjectName: 'WEB TECHNOLOGY',
    subjectShort: 'WT',
    headMasterJSON: {
      ...headTemp,
      points: [2, 2, 2, 4, 1, 5, 60, 40, 25, 25, 150],
    },
    subjectType: 'Subject Type 1',
    department: 'IT - Information Technology',
    updateNo: 0,
    isElective: false,
    semNo: 7,
    listIndex: 5,
    isFreezed: false,
    crudInfo: {
      type: 'SUBJECT_CREATE',
      by: 'Script Manger User',
    },
    theoryFile: {
      name: 'Test Theory-1615530125925.pdf',
      path: 'uploads/Subjects/Test Theory-1615530125925.pdf',
    },
    practicalFile: {
      name: 'Test Practical-1615530125925.pdf',
      path: 'uploads/Subjects/Test Practical-1615530125925.pdf',
    },
    noOfFiles: 1,
    files: [
      {
        name: 'Test Theory-1615530125925.pdf',
        path: 'uploads/Subjects/Test Theory-1615530125925.pdf',
      },
    ],
  },
  {
    subjectCode: 'IT 718',
    subjectName: 'E-COMMERCE AND E- SECURITY',
    subjectShort: 'ECES',
    headMasterJSON: {
      ...headTemp,
      points: [4, 0, 2, 4, 1, 5, 60, 40, 25, 25, 150],
    },
    subjectType: 'Subject Type 1',
    department: 'IT - Information Technology',
    updateNo: 0,
    isElective: true,
    semNo: 7,
    listIndex: 6,
    isFreezed: false,
    crudInfo: {
      type: 'SUBJECT_CREATE',
      by: 'Script Manger User',
    },
    theoryFile: {
      name: 'Test Theory-1615530125925.pdf',
      path: 'uploads/Subjects/Test Theory-1615530125925.pdf',
    },
    practicalFile: {
      name: 'Test Practical-1615530125925.pdf',
      path: 'uploads/Subjects/Test Practical-1615530125925.pdf',
    },
    noOfFiles: 1,
    files: [
      {
        name: 'Test Theory-1615530125925.pdf',
        path: 'uploads/Subjects/Test Theory-1615530125925.pdf',
      },
    ],
  },
  {
    subjectCode: 'IT 718A',
    subjectName: 'INTRODUCTION TO NEURAL NETWORKS',
    subjectShort: 'INN',
    headMasterJSON: {
      ...headTemp,
      points: [4, 0, 2, 4, 1, 5, 60, 40, 25, 25, 150],
    },
    subjectType: 'Subject Type 1',
    department: 'IT - Information Technology',
    updateNo: 0,
    isElective: true,
    semNo: 7,
    listIndex: 7,
    isFreezed: false,
    crudInfo: {
      type: 'SUBJECT_CREATE',
      by: 'Script Manger User',
    },
    theoryFile: {
      name: 'Test Theory-1615530125925.pdf',
      path: 'uploads/Subjects/Test Theory-1615530125925.pdf',
    },
    practicalFile: {
      name: 'Test Practical-1615530125925.pdf',
      path: 'uploads/Subjects/Test Practical-1615530125925.pdf',
    },
    noOfFiles: 1,
    files: [
      {
        name: 'Test Theory-1615530125925.pdf',
        path: 'uploads/Subjects/Test Theory-1615530125925.pdf',
      },
    ],
  },
  {
    subjectCode: 'IT 718B',
    subjectName: 'DIGITAL IMAGE PROCESSING',
    subjectShort: 'DIP',
    headMasterJSON: {
      ...headTemp,
      points: [4, 0, 2, 4, 1, 5, 60, 40, 25, 25, 150],
    },
    subjectType: 'Subject Type 1',
    department: 'IT - Information Technology',
    updateNo: 0,
    isElective: true,
    semNo: 7,
    listIndex: 8,
    isFreezed: false,
    crudInfo: {
      type: 'SUBJECT_CREATE',
      by: 'Script Manger User',
    },
    theoryFile: {
      name: 'Test Theory-1615530125925.pdf',
      path: 'uploads/Subjects/Test Theory-1615530125925.pdf',
    },
    practicalFile: {
      name: 'Test Practical-1615530125925.pdf',
      path: 'uploads/Subjects/Test Practical-1615530125925.pdf',
    },
    noOfFiles: 1,
    files: [
      {
        name: 'Test Theory-1615530125925.pdf',
        path: 'uploads/Subjects/Test Theory-1615530125925.pdf',
      },
    ],
  },
  {
    subjectCode: 'IT 718C',
    subjectName: 'CLOUD COMPUTING',
    subjectShort: 'CC',
    headMasterJSON: {
      ...headTemp,
      points: [4, 0, 2, 4, 1, 5, 60, 40, 25, 25, 150],
    },
    subjectType: 'Subject Type 1',
    department: 'IT - Information Technology',
    updateNo: 0,
    isElective: true,
    semNo: 7,
    listIndex: 9,
    isFreezed: false,
    crudInfo: {
      type: 'SUBJECT_CREATE',
      by: 'Script Manger User',
    },
    theoryFile: {
      name: 'Test Theory-1615530125925.pdf',
      path: 'uploads/Subjects/Test Theory-1615530125925.pdf',
    },
    practicalFile: {
      name: 'Test Practical-1615530125925.pdf',
      path: 'uploads/Subjects/Test Practical-1615530125925.pdf',
    },
    noOfFiles: 1,
    files: [
      {
        name: 'Test Theory-1615530125925.pdf',
        path: 'uploads/Subjects/Test Theory-1615530125925.pdf',
      },
    ],
  },
  {
    subjectCode: 'IT 718D',
    subjectName: 'MOBILE APP. DEVELOPMENT',
    subjectShort: 'MAP',
    headMasterJSON: {
      ...headTemp,
      points: [4, 0, 2, 4, 1, 5, 60, 40, 25, 25, 150],
    },
    subjectType: 'Subject Type 1',
    department: 'IT - Information Technology',
    updateNo: 0,
    isElective: true,
    semNo: 7,
    listIndex: 10,
    isFreezed: false,
    crudInfo: {
      type: 'SUBJECT_CREATE',
      by: 'Script Manger User',
    },
    theoryFile: {
      name: 'Test Theory-1615530125925.pdf',
      path: 'uploads/Subjects/Test Theory-1615530125925.pdf',
    },
    practicalFile: {
      name: 'Test Practical-1615530125925.pdf',
      path: 'uploads/Subjects/Test Practical-1615530125925.pdf',
    },
    noOfFiles: 1,
    files: [
      {
        name: 'Test Theory-1615530125925.pdf',
        path: 'uploads/Subjects/Test Theory-1615530125925.pdf',
      },
    ],
  },
  // Sem 8
  {
    subjectCode: 'AF 801',
    subjectName: 'PROJECT/INDUSTRIAL TRAINING',
    subjectShort: 'PT',
    headMasterJSON: {
      ...headTemp,
      points: [0, 0, 28, 0, 14, 14, 0, 0, 300, 100, 400],
    },
    subjectType: 'Subject Type 1',
    department: 'IT - Information Technology',
    updateNo: 0,
    isElective: false,
    semNo: 8,
    listIndex: 1,
    isFreezed: false,
    crudInfo: {
      type: 'SUBJECT_CREATE',
      by: 'Script Manger User',
    },
    theoryFile: {
      name: 'Test Theory-1615530125925.pdf',
      path: 'uploads/Subjects/Test Theory-1615530125925.pdf',
    },
    practicalFile: {
      name: 'Test Practical-1615530125925.pdf',
      path: 'uploads/Subjects/Test Practical-1615530125925.pdf',
    },
    noOfFiles: 1,
    files: [
      {
        name: 'Test Theory-1615530125925.pdf',
        path: 'uploads/Subjects/Test Theory-1615530125925.pdf',
      },
    ],
  },
  {
    subjectCode: 'AF 802',
    subjectName: 'SEMINAR',
    subjectShort: 'SEM',
    headMasterJSON: {
      ...headTemp,
      points: [0, 4, 0, 4, 0, 4, 0, 100, 0, 0, 100],
    },
    subjectType: 'Subject Type 1',
    department: 'IT - Information Technology',
    updateNo: 0,
    isElective: false,
    semNo: 8,
    listIndex: 2,
    isFreezed: false,
    crudInfo: {
      type: 'SUBJECT_CREATE',
      by: 'Script Manger User',
    },
    theoryFile: {
      name: 'Test Theory-1615530125925.pdf',
      path: 'uploads/Subjects/Test Theory-1615530125925.pdf',
    },
    practicalFile: {
      name: 'Test Practical-1615530125925.pdf',
      path: 'uploads/Subjects/Test Practical-1615530125925.pdf',
    },
    noOfFiles: 1,
    files: [
      {
        name: 'Test Theory-1615530125925.pdf',
        path: 'uploads/Subjects/Test Theory-1615530125925.pdf',
      },
    ],
  },
];

module.exports = subjects;
