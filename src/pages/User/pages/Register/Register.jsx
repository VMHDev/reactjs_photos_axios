import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { Base64 } from 'js-base64';

import { useRegister } from 'hooks/axios/apiUsers';
import { showLoading, showModalOk } from 'redux/appSlice';
import { addUser } from 'redux/userSlice';
import RegisterForm from 'pages/User/components/RegisterForm';
import Banner from 'components/Banner';

// Constants
import Images from 'constants/images';
import { PATH_USER_LOGIN } from 'constants/route';
import {
  NOTIFICATION,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
} from 'constants/modal';

// Styles
import './styles.scss';

const Register = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [apiRegister] = useRegister();

  const initialValues = {
    id: uuidv4(),
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  // Handle events
  const handleSubmit = async (values) => {
    let isSuccess = false;
    let message = '';
    dispatch(showLoading(true));
    try {
      let objUser = { ...values };
      delete objUser.confirmPassword;
      objUser.password = Base64.encode(objUser.password);

      // Call API
      const response = await apiRegister({
        name: objUser.name,
        email: objUser.email,
        password: objUser.password,
      });

      // Update state
      message = response.message;
      if (response.success) {
        const action = addUser(objUser);
        dispatch(action);
        isSuccess = true;
      }
    } catch (error) {
      console.log(error);
    }
    dispatch(showLoading(false));

    if (isSuccess) {
      dispatch(
        showModalOk({
          title: NOTIFICATION,
          content: message === '' ? REGISTER_SUCCESS : message,
        })
      );
      history.push(PATH_USER_LOGIN);
    } else {
      dispatch(
        showModalOk({
          title: NOTIFICATION,
          content: message === '' ? REGISTER_FAILED : message,
        })
      );
    }
  };

  return (
    <div className='register'>
      <Banner title='Register 🔥' backgroundUrl={Images.BRIDGE2_BG} />
      <div className='register__form'>
        <RegisterForm
          initialValues={initialValues}
          onSubmit={handleSubmit}
          typePage='register'
        />
      </div>
    </div>
  );
};

Register.propTypes = {};

export default Register;
