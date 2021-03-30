import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faSignOutAlt,
  faSignInAlt,
  faUserPlus,
  faHome,
  faInfoCircle,
  faLock,
  faEnvelope,
  faDiceOne,
  faDiceTwo,
  faDiceThree,
  faPhoneAlt,
  faUserTag,
  faUserTie,
  faIdCard,
  faChalkboardTeacher,
  faBullhorn,
  faBell,
  faBookMedical,
  faFolderPlus,
  faPlusSquare,
  faBook,
  faWindowRestore,
  faThList,
  faFileCode,
  faPen,
  faFlask,
  faPoll,
  faGraduationCap,
  faCheckCircle,
  faExclamationCircle,
  faExclamationTriangle,
  faQuestionCircle,
  faHandshake,
  faSearch,
  faCopy,
  faBookOpen,
  faCheckDouble,
  faEdit,
  faFilePdf,
  faCheckSquare,
  faUserShield,
  faFileAlt,
  faUpload,
  faTools,
} from '@fortawesome/free-solid-svg-icons';

const iconUser = <FontAwesomeIcon icon={faUser} />;
const iconLogOut = <FontAwesomeIcon icon={faSignOutAlt} />;
const iconLogIn = <FontAwesomeIcon icon={faSignInAlt} />;
const iconRegister = <FontAwesomeIcon icon={faUserPlus} />;
const iconHome = <FontAwesomeIcon icon={faHome} />;
const iconAbout = <FontAwesomeIcon icon={faInfoCircle} />;
const iconPassword = <FontAwesomeIcon icon={faLock} />;
const iconEmail = <FontAwesomeIcon icon={faEnvelope} />;
const iconFirstName = <FontAwesomeIcon icon={faDiceOne} />;
const iconMiddleName = <FontAwesomeIcon icon={faDiceTwo} />;
const iconLastName = <FontAwesomeIcon icon={faDiceThree} />;
const iconContactNumber = <FontAwesomeIcon icon={faPhoneAlt} />;
const iconUserRole = <FontAwesomeIcon icon={faUserTag} />;
const iconUserTie = <FontAwesomeIcon icon={faUserTie} />;
const iconUserProfile = <FontAwesomeIcon icon={faIdCard} />;
const iconDashboard = <FontAwesomeIcon icon={faChalkboardTeacher} />;
const iconAnnouncement = <FontAwesomeIcon icon={faBullhorn} />;
const iconNotification = <FontAwesomeIcon icon={faBell} />;
const iconSyllabusManger = <FontAwesomeIcon icon={faBookMedical} />;
// TODO Remove this 2
const iconCreateCourse = <FontAwesomeIcon icon={faFolderPlus} />;
const iconCreateSubject = <FontAwesomeIcon icon={faPlusSquare} />;
const iconSubject = <FontAwesomeIcon icon={faBook} />;
const iconCourse = <FontAwesomeIcon icon={faGraduationCap} />;
const iconCardView = <FontAwesomeIcon icon={faWindowRestore} />;
const iconListView = <FontAwesomeIcon icon={faThList} />;
const iconJsonView = <FontAwesomeIcon icon={faFileCode} />;
const iconTheory = <FontAwesomeIcon icon={faPen} />;
const iconPractical = <FontAwesomeIcon icon={faFlask} />;
const iconResult = <FontAwesomeIcon icon={faPoll} />;
const iconAcademicBatch = <FontAwesomeIcon icon={faBookOpen} />;
const fucIconAlert = (variant) => {
  switch (variant) {
    case 'success':
      return <FontAwesomeIcon icon={faCheckCircle}></FontAwesomeIcon>;
    case 'danger':
      return <FontAwesomeIcon icon={faExclamationTriangle}></FontAwesomeIcon>;
    case 'warning':
      return <FontAwesomeIcon icon={faExclamationCircle}></FontAwesomeIcon>;
    case 'info':
    default:
      return <FontAwesomeIcon icon={faQuestionCircle}></FontAwesomeIcon>;
  }
};
const iconMeeting = <FontAwesomeIcon icon={faHandshake} />;
const iconSearch = <FontAwesomeIcon icon={faSearch} />;
const iconCreate = <FontAwesomeIcon icon={faFolderPlus} />;
const iconCopy = <FontAwesomeIcon icon={faCopy} />;
const iconCreate2 = <FontAwesomeIcon icon={faPlusSquare} />;
const iconValidate = <FontAwesomeIcon icon={faCheckDouble} />;
const iconEdit = <FontAwesomeIcon icon={faEdit} />;
const iconEdit2 = <FontAwesomeIcon icon={faPen} />;
const iconFileGen = <FontAwesomeIcon icon={faFilePdf} />;
const iconTodo = <FontAwesomeIcon icon={faCheckSquare} />;
const iconAdminBoard = <FontAwesomeIcon icon={faUserShield} />;
const iconSystemInfo = <FontAwesomeIcon icon={faFileAlt} />;
const iconUpload = <FontAwesomeIcon icon={faUpload} />;
const iconEditSystem = <FontAwesomeIcon icon={faTools} />;

export {
  iconUser,
  iconLogOut,
  iconLogIn,
  iconRegister,
  iconHome,
  iconAbout,
  iconPassword,
  iconEmail,
  iconFirstName,
  iconMiddleName,
  iconLastName,
  iconContactNumber,
  iconUserRole,
  iconUserTie,
  iconUserProfile,
  iconDashboard,
  iconAnnouncement,
  iconNotification,
  iconSyllabusManger,
  iconCreateCourse,
  iconCreateSubject,
  iconSubject,
  iconCourse,
  iconCardView,
  iconListView,
  iconJsonView,
  iconTheory,
  iconPractical,
  iconResult,
  iconAcademicBatch,
  fucIconAlert,
  iconMeeting,
  iconSearch,
  iconCreate,
  iconCopy,
  iconCreate2,
  iconValidate,
  iconEdit,
  iconEdit2,
  iconFileGen,
  iconTodo,
  iconAdminBoard,
  iconSystemInfo,
  iconUpload,
  iconEditSystem,
};
