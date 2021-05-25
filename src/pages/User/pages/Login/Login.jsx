import React, { Fragment, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Base64 } from 'js-base64';

import { useLogin } from 'hooks/axios/apiAuth';
import { addLogin, removeLogin } from 'redux/cookieSlice';
import { showLoading, showModalOk } from 'redux/appSlice';
import LoginForm from 'pages/User/components/LoginForm';
import Banner from 'components/Banner';

// Constants
import Images from 'constants/images';
import {
  PATH_HOME,
  PATH_PHOTOS,
  PATH_CATEGORIES,
  PATH_PHOTOS_ADD,
  PATH_CATEGORIES_ADD,
} from 'constants/route';
import { NOTIFICATION, LOGIN_FAILED } from 'constants/modal';
// Styles
import './styles.scss';

// Main
const LoginPage = (props) => {
  const userLogin = useSelector((state) => state.cookies.userLogin);

  const dispatch = useDispatch();
  const history = useHistory();
  const [apiLogin] = useLogin();

  const initialValues = {
    email: '',
    password: '',
  };

  useEffect(() => {
    if (userLogin) {
      //Logout
      dispatch(removeLogin(null));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle events
  const handleSubmitLogin = async (values) => {
    let isSuccess = false;
    let message = '';
    dispatch(showLoading(true));
    try {
      // Call API
      const response = await apiLogin({
        email: values.email,
        password: Base64.encode(values.password),
      });

      // Update state
      message = response.message;
      if (response.success) {
        dispatch(
          addLogin({ user: response.user, token: response.accessToken })
        );
        isSuccess = true;
      }
    } catch (error) {
      console.log(error);
    }
    dispatch(showLoading(false));

    // Handle result
    if (isSuccess) {
      // Redirect pages
      const type = props.location.state?.type;
      switch (type) {
        case 'Photo_Remove':
        case 'Photo_Edit':
          history.push(PATH_PHOTOS);
          break;
        case 'Photo_Add':
          history.push(PATH_PHOTOS_ADD);
          break;
        case 'Category_Remove':
        case 'Category_Edit':
          history.push(PATH_CATEGORIES);
          break;
        case 'Category_Add':
          history.push(PATH_CATEGORIES_ADD);
          break;
        default:
          history.push(PATH_HOME);
          break;
      }
    } else {
      dispatch(
        // Show dialog
        showModalOk({
          title: NOTIFICATION,
          content: message === '' ? LOGIN_FAILED : message,
        })
      );
    }
  };

  return (
    <Fragment>
      <div className='login'>
        <Banner title='Login 🎉' backgroundUrl={Images.BRIDGE_BG} />
        <div className='login__form'>
          <LoginForm
            initialValues={initialValues}
            onSubmit={handleSubmitLogin}
          />
        </div>
      </div>
    </Fragment>
  );
};

LoginPage.propTypes = {};

export default LoginPage;
