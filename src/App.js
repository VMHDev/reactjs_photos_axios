import React, { Suspense, Fragment } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { Spinner } from 'reactstrap';

import Header from 'components/Header';
import NotFound from 'components/NotFound';
import { ModalOk } from 'components/Modal';
import Loading from 'components/Loading';
import useShowOk from 'hooks/modal/useShowOk';
import { useLogout } from 'hooks/axios/apiAuths';

// Constants
import {
  PATH_HOME,
  PATH_PHOTOS,
  PATH_CATEGORIES,
  PATH_USER,
  PATH_NOTFOUND,
} from './constants/route';
import { NOTIFICATION, ERROR_GENERAL, LOGOUT_FAILED } from 'constants/modal';

// Styles
import './App.scss';

// Lazy load Components page
const Photo = React.lazy(
  () =>
    new Promise((resolve) => {
      setTimeout(() => resolve(import('./pages/Photo/Photo')), 1000);
    })
);
const Category = React.lazy(() => import('./pages/Category/Category'));
const Home = React.lazy(() => import('./pages/Home/Home'));
const User = React.lazy(() => import('./pages/User/User'));

// Main
const App = () => {
  const [showOk] = useShowOk();
  const [apiLogout] = useLogout();

  // Handle events
  const handleLogoutClick = async () => {
    try {
      const response = await apiLogout();
      if (response?.success) {
        return <Redirect to={PATH_HOME} />;
      } else {
        showOk({ title: NOTIFICATION, content: LOGOUT_FAILED });
      }
    } catch (error) {
      showOk({ title: NOTIFICATION, content: ERROR_GENERAL });
      console.log(error);
    }
  };

  // Render GUI
  return (
    <Fragment>
      <Loading>
        <div className='photo-app'>
          <Suspense
            fallback={
              <div className='page-wrap d-flex flex-row align-items-center'>
                <div className='container'>
                  <div className='row justify-content-center'>
                    <Spinner style={{ width: '3rem', height: '3rem' }} />
                  </div>
                </div>
              </div>
            }>
            <Router>
              <Header onLogoutClick={handleLogoutClick} />

              <Switch>
                <Redirect exact from='/' to={PATH_HOME} />

                <Route exact path={PATH_HOME} component={Home} />
                <Route path={PATH_PHOTOS} component={Photo} />
                <Route path={PATH_CATEGORIES} component={Category} />
                <Route path={PATH_USER} component={User} />
                <Route path={PATH_NOTFOUND} component={NotFound} />

                <Route component={NotFound} />
              </Switch>
            </Router>
          </Suspense>
        </div>
      </Loading>
      {/* Modal */}
      <ModalOk />
    </Fragment>
  );
};

export default App;
