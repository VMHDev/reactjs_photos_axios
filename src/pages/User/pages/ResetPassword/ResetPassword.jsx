import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Base64 } from 'js-base64';
import moment from 'moment';

import { useGetById } from 'hooks/axios/apiUsers';
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

  const history = useHistory();
  const { token } = useParams();

  const [isTokenValid, setIsTokenValid] = useState(true);
  const [user, setUser] = useState({});

  const [apiGetById] = useGetById();
  useEffect(() => {
    const checkToken = async () => {
      // Check token valid
      const tokenFound = tokens.find((item) => item.token === token);
      if (tokenFound) {
        // Get info user
        const response = await apiGetById(tokenFound.user_id);
        if (!response.success) {
          return;
        }
        const userFound = response.user;
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
    };

    checkToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      // const action = updateUser(objUser);
      // dispatch(action);
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
