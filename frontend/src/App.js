import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Layout Componets
import Navbar from './components/layout/Navbar';

// Page Componets
import Home from './components/page/Home';
import NotFound from './components/page/NotFound';
import About from './components/page/About';

// Auth Componets
import LogIn from './components/auth/LogIn';
import Register from './components/auth/Register';

// Routing Componets
import PrivateRoute from './components/routing/PrivateRoute';

// Darshboard Componets
import Dashboard from './components/dashboard/Dashboard';

// State
import AuthState from './context/auth/AuthState';

function App() {
  return (
    <AuthState>
      <Router>
        <Navbar />
        <Container>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/about' component={About} />
            <Route exact path='/login' component={LogIn} />
            <Route exact path='/register' component={Register} />
            <PrivateRoute exact path='/dashboard' component={Dashboard} />
            <Route component={NotFound} />
          </Switch>
        </Container>
      </Router>
    </AuthState>
  );
}

export default App;
