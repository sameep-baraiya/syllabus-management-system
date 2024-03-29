import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { pdfjs } from 'react-pdf';
import './components/style/sidebar.css';
import './components/style/showonhover.css';

// Layout Componets
import Navbar from './components/layout/Navbar';
import Alert from './components/layout/Alert';
import Sidebar from './components/layout/Sidebar';

// Page Componets
import Home from './components/page/Home';
import NotFound from './components/page/NotFound';
import About from './components/page/About';

// Syllabus Manager Componets
import SyllabusManager from './components/syllabus-manager/SyllabusManager';

// Admin Board Componets
import AdminBoard from './components/admin-board/AdminBoard';

// Auth Componets
import LogIn from './components/auth/LogIn';
import Register from './components/auth/Register';

// Routing Componets
import PrivateRoute from './components/routing/PrivateRoute';

// Darshboard Componets
import Dashboard from './components/dashboard/Dashboard';

// Announcement Componets
import Announcement from './components/announcement/Announcement';

// Profile Componets
import Profile from './components/profile/Profile';

// State
import AuthState from './context/auth/AuthState';
import SubjectState from './context/subject/SubjectState';
import CourseState from './context/course/CourseState';
import DownloadState from './context/download/DownloadState';
import AcademicBatchState from './context/academicBatch/AcademicBatchState';
import LoadingState from './context/loading/LoadingState';
import AlertState from './context/alert/AlertState';
import NotificationState from './context/notification/NotificationState';
import MeetingState from './context/meeting/MeetingState';
import CrudInfoState from './context/crud-info/crudInfoState';
import StorageState from './context/storage/StorageState';
import UserState from './context/user/UserState';
import ConfigState from './context/config/ConfigState';
import AccountRequestState from './context/account-request/AccountRequestState';
import AnnouncementState from './context/announcement/AnnouncementState';

function App() {
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

  return (
    <LoadingState>
      <AlertState>
        <ConfigState>
          <NotificationState>
            <AccountRequestState>
              <UserState>
                <CrudInfoState>
                  <AnnouncementState>
                    <StorageState>
                      <AuthState>
                        <SubjectState>
                          <CourseState>
                            <DownloadState>
                              <AcademicBatchState>
                                <MeetingState>
                                  <Router>
                                    <Navbar />
                                    <Alert />
                                    <div className='grid-container'>
                                      <div className='sidebar'>
                                        <Sidebar />
                                      </div>
                                      <div className='main-content'>
                                        <Container>
                                          <Switch>
                                            <Route
                                              exact
                                              path='/'
                                              component={Home}
                                            />
                                            <Route
                                              exact
                                              path='/about'
                                              component={About}
                                            />
                                            <Route
                                              exact
                                              path='/login'
                                              component={LogIn}
                                            />
                                            <Route
                                              exact
                                              path='/register'
                                              component={Register}
                                            />
                                            <PrivateRoute
                                              path='/announcement'
                                              component={Announcement}
                                              role={[
                                                'admin',
                                                'faculty-member',
                                                'syllabus-manager',
                                              ]}
                                            />
                                            <PrivateRoute
                                              path='/profile'
                                              component={Profile}
                                              role={[
                                                'admin',
                                                'faculty-member',
                                                'syllabus-manager',
                                              ]}
                                            />
                                            <PrivateRoute
                                              path='/dashboard'
                                              component={Dashboard}
                                              role={[
                                                'admin',
                                                'faculty-member',
                                                'syllabus-manager',
                                              ]}
                                            />
                                            <PrivateRoute
                                              path='/syllabus-manager'
                                              component={SyllabusManager}
                                              role={[
                                                'admin',
                                                'syllabus-manager',
                                              ]}
                                            />
                                            <PrivateRoute
                                              path='/admin-board'
                                              component={AdminBoard}
                                              role={['admin']}
                                            />
                                            <Route component={NotFound} />
                                          </Switch>
                                        </Container>
                                      </div>
                                    </div>
                                  </Router>
                                </MeetingState>
                              </AcademicBatchState>
                            </DownloadState>
                          </CourseState>
                        </SubjectState>
                      </AuthState>
                    </StorageState>
                  </AnnouncementState>
                </CrudInfoState>
              </UserState>
            </AccountRequestState>
          </NotificationState>
        </ConfigState>
      </AlertState>
    </LoadingState>
  );
}

export default App;
