import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import cryptoRandomString from 'crypto-random-string';

import { useGetByEmail } from 'hooks/axios/apiUsers';
import { addToken } from 'redux/userTokenSlice';
import ForgotPasswordForm from 'pages/User/components/ForgotPasswordForm';
import Banner from 'components/Banner';

// Constants
import Images from 'constants/images';
import { PASSWORD_RESET_TOKEN_LENGTH, WEB_URL } from 'constants/system';
import { PATH_USER_RESETPASSWORD } from 'constants/route';

// Styles
import './styles.scss';

const ForgotPassword = (props) => {
  const dispatch = useDispatch();

  const initialValues = {
    email: '',
  };

  const [email, setEmail] = useState('');
  const [fogotPassword, setFogotPassword] = useState(0);
  const [token, setToken] = useState('');
  useEffect(() => {}, [token]);

  const generateToken = (userId) => {
    const randomString = cryptoRandomString({
      length: PASSWORD_RESET_TOKEN_LENGTH,
      type: 'base64',
    });
    const sToken = userId + '-' + randomString;
    setToken(sToken);
    return sToken;
  };

  // Handle events
  const [apiGetByEmail] = useGetByEmail();
  const handleSubmit = async (values) => {
    try {
      setEmail(values.email);
      const response = await apiGetByEmail(values.email);
      if (!response.success) {
        return;
      }
      const userFound = response.user;
      if (userFound) {
        const sToken = generateToken(userFound._id);
        const objToken = {
          id: uuidv4(),
          user_id: userFound._id,
          token: sToken,
          delete_flg: false,
          registered_date: moment().format('YYYY-MM-DD HH:mm:ss'),
        };
        const action = addToken(objToken);
        dispatch(action);
        setFogotPassword(1);
      } else {
        setFogotPassword(2);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const pathResetPassword = PATH_USER_RESETPASSWORD + token;

  return (
    <div className='forgot-password'>
      <Banner title='Forgot Password 🔥' backgroundUrl={Images.BRIDGE2_BG} />
      <div className='forgot-password__form'>
        <ForgotPasswordForm
          initialValues={initialValues}
          onSubmit={handleSubmit}
        />
        {fogotPassword === 1 ? (
          <>
            <span>Step next click link: </span>
            <NavLink to={{ pathname: pathResetPassword, state: { email } }}>
              {WEB_URL + PATH_USER_RESETPASSWORD + token}
            </NavLink>
          </>
        ) : fogotPassword === 2 ? (
          <div className='forgot-password__message'>Email not exist </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

ForgotPassword.propTypes = {};

export default ForgotPassword;
