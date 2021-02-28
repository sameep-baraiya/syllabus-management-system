import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Layout Componets
import Navbar from './components/layout/Navbar';
import Alert from './components/layout/Alert';

// Page Componets
import Home from './components/page/Home';
import NotFound from './components/page/NotFound';
import About from './components/page/About';

// Syllabus Manager Componets
import SyllabusManager from './components/syllabus-manager/SyllabusManager';

// Auth Componets
import LogIn from './components/auth/LogIn';
import Register from './components/auth/Register';

// Routing Componets
import PrivateRoute from './components/routing/PrivateRoute';

// Darshboard Componets
import Dashboard from './components/dashboard/Dashboard';

// State
import AuthState from './context/auth/AuthState';
import SubjectState from './context/subject/SubjectState';
import CourseState from './context/course/CourseState';
import DownloadState from './context/download/DownloadState';
import AcademicBatchState from './context/academicBatch/AcademicBatchState';
import LoadingState from './context/loading/LoadingState';
import AlertState from './context/alert/AlertState';

function App() {
  return (
    <LoadingState>
      <AlertState>
        <AuthState>
          <SubjectState>
            <CourseState>
              <DownloadState>
                <AcademicBatchState>
                  <Router>
                    <Navbar />
                    <Alert />
                    <Container fluid>
                      <Switch>
                        <Route exact path='/' component={Home} />
                        <Route exact path='/about' component={About} />
                        <Route exact path='/login' component={LogIn} />
                        <Route exact path='/register' component={Register} />
                        <PrivateRoute path='/dashboard' component={Dashboard} />
                        <PrivateRoute
                          path='/syllabus-manager'
                          component={SyllabusManager}
                        />
                        <Route component={NotFound} />
                      </Switch>
                    </Container>
                  </Router>
                </AcademicBatchState>
              </DownloadState>
            </CourseState>
          </SubjectState>
        </AuthState>
      </AlertState>
    </LoadingState>
  );
}

export default App;
