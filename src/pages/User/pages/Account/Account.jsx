import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Base64 } from 'js-base64';

import { updateUser } from 'redux/userSlice';
import RegisterForm from 'pages/User/components/RegisterForm';
import Banner from 'components/Banner';

// Constants
import Images from 'constants/images';
import { PATH_USER_LOGIN } from 'constants/route';

// Styles
import './styles.scss';

const Account = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  // Get cookie
  const userLogin = useSelector((state) => state.cookies.login);
  useEffect(() => {
    if (!userLogin) {
      history.push(PATH_USER_LOGIN);
    }
  }, [userLogin, history]);

  const initialValues = {
    id: userLogin.id,
    name: userLogin.name,
    email: userLogin.email,
    password: Base64.decode(userLogin.password),
    confirmPassword: Base64.decode(userLogin.password),
  };

  // Handle events
  const handleSubmit = (values) => {
    try {
      // Update user
      let objUser = { ...values };
      delete objUser.confirmPassword;
      objUser.password = Base64.encode(objUser.password);
      const actionUpdate = updateUser(objUser);
      dispatch(actionUpdate);
      // Redirect
      history.push(PATH_USER_LOGIN);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='account'>
      <Banner title='Account 🔥' backgroundUrl={Images.rainBackground} />
      <div className='account__form'>
        <RegisterForm
          initialValues={initialValues}
          onSubmit={handleSubmit}
          typePage='account'
        />
      </div>
    </div>
  );
};

Account.propTypes = {};

export default Account;
