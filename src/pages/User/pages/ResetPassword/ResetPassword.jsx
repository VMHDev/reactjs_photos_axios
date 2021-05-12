import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Base64 } from 'js-base64';
import moment from 'moment';

import { updateUser } from 'redux/userSlice';
import ResetPasswordForm from 'pages/User/components/ResetPasswordForm';
import Banner from 'components/Banner';
import NotFound from 'components/NotFound';

// Constants
import Images from 'constants/images';
import { PATH_USER_LOGIN } from 'constants/route';
import { PASSWORD_TOKEN_EXPIRE } from 'constants/system';

// Styles
import './styles.scss';

const ResetPassword = (props) => {
  const tokens = useSelector((state) => state.user_tokens);
  const users = useSelector((state) => state.users.data);
  const dispatch = useDispatch();
  const history = useHistory();
  const { token } = useParams();

  const [isTokenValid, setIsTokenValid] = useState(true);
  const [user, setUser] = useState({});

  useEffect(() => {
    // Check token valid
    const tokenFound = tokens.find((item) => item.token === token);
    if (tokenFound) {
      // Get info user
      const userFound = users.find((item) => item.id === tokenFound.user_id);
      setUser(userFound);

      // Check token expire
      const dateRegister = moment(
        tokenFound.registered_date,
        'YYYY-MM-DD HH:mm:ss'
      )
        .add(PASSWORD_TOKEN_EXPIRE, 'm')
        .toDate();
      if (dateRegister < Date.now()) {
        setIsTokenValid(false);
      }
    } else {
      setIsTokenValid(false);
    }
  }, [tokens, token, users]);

  const initialValues = {
    email: props.location.state.email,
    password: '',
    confirmPassword: '',
  };

  // Handle events
  const handleSubmit = (values) => {
    try {
      let objUser = { ...user, ...values };
      delete objUser.confirmPassword;
      objUser.password = Base64.encode(objUser.password);
      const action = updateUser(objUser);
      dispatch(action);
      history.push(PATH_USER_LOGIN);
    } catch (error) {
      console.log(error);
    }
  };

  return isTokenValid ? (
    <div className='reset-password'>
      <Banner title='Reset Password 🔥' backgroundUrl={Images.BRIDGE2_BG} />
      <div className='reset-password__form'>
        <ResetPasswordForm
          initialValues={initialValues}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  ) : (
    <NotFound />
  );
};

ResetPassword.propTypes = {};

export default ResetPassword;
