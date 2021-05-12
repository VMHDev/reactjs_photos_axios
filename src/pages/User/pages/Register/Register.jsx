import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { Base64 } from 'js-base64';

import { addUser } from 'redux/userSlice';
import RegisterForm from 'pages/User/components/RegisterForm';
import Banner from 'components/Banner';

// Constants
import Images from 'constants/images';
import { PATH_USER_LOGIN } from 'constants/route';

// Styles
import './styles.scss';

const Register = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const initialValues = {
    id: uuidv4(),
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  // Handle events
  const handleSubmit = (values) => {
    try {
      let objUser = { ...values };
      delete objUser.confirmPassword;
      objUser.password = Base64.encode(objUser.password);
      const action = addUser(objUser);
      dispatch(action);
      history.push(PATH_USER_LOGIN);
    } catch (error) {
      console.log(error);
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
