import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { pdfjs } from 'react-pdf';
import './components/style/sidebar.css';

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

// Auth Componets
import LogIn from './components/auth/LogIn';
import Register from './components/auth/Register';

// // Routing Componets
import PrivateRoute from './components/routing/PrivateRoute';

// // Darshboard Componets
import Dashboard from './components/dashboard/Dashboard';

// State
import AuthState from './context/auth/AuthState';
import SubjectState from './context/subject/SubjectState';
import CourseState from './context/course/CourseState';
import DownloadState from './context/download/DownloadState';
import AcademicBatchState from './context/academicBatch/AcademicBatchState';
import LoadingState from './context/loading/LoadingState';
import AlertState from './context/alert/AlertState';
import NotificationState from './context/notification/NotificationState';

function App() {
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

  return (
    <LoadingState>
      <AlertState>
        <NotificationState>
          <AuthState>
            <SubjectState>
              <CourseState>
                <DownloadState>
                  <AcademicBatchState>
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
                              <Route exact path='/' component={Home} />
                              <Route exact path='/about' component={About} />
                              <Route exact path='/login' component={LogIn} />
                              <Route
                                exact
                                path='/register'
                                component={Register}
                              />
                              <PrivateRoute
                                path='/dashboard'
                                component={Dashboard}
                              />
                              <PrivateRoute
                                path='/syllabus-manager'
                                component={SyllabusManager}
                              />
                              <Route component={NotFound} />
                            </Switch>
                          </Container>
                        </div>
                      </div>
                    </Router>
                  </AcademicBatchState>
                </DownloadState>
              </CourseState>
            </SubjectState>
          </AuthState>
        </NotificationState>
      </AlertState>
    </LoadingState>
  );
}

export default App;
