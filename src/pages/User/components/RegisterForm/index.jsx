import React from 'react';
import PropTypes from 'prop-types';
import { Button, FormGroup } from 'reactstrap';
import { Formik, Form, FastField } from 'formik';
import * as Yup from 'yup';

import InputField from 'components/InputField';

const RegisterForm = (props) => {
  const { initialValues, onSubmit, typePage } = props;

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('This field is required.'),

    email: Yup.string()
      .required('This field is required.')
      .email('This field is invalid email'),

    password: Yup.string()
      .required('This field is required.')
      .min(6, 'Min length 6 character')
      .max(20, 'Max length 20 character'),

    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], "Password don't match!")
      .required('This field is required.'),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}>
      {() => {
        return (
          <Form>
            <FastField
              name='name'
              component={InputField}
              label='Name'
              placeholder='Harry Potter'
            />

            <FastField
              name='email'
              component={InputField}
              label='Email'
              placeholder='your-email@mail.com'
              disabled={typePage === 'account' ? true : false}
            />

            <FastField
              name='password'
              component={InputField}
              label='Password'
              placeholder='********'
              type='password'
            />

            <FastField
              name='confirmPassword'
              component={InputField}
              label='Confirm Password'
              placeholder='********'
              type='password'
            />

            <FormGroup>
              <Button type='submit' color='primary'>
                {typePage === 'account' ? 'Update' : 'Register'}
              </Button>
            </FormGroup>
          </Form>
        );
      }}
    </Formik>
  );
};

RegisterForm.propTypes = {
  initialValues: PropTypes.object,
  onSubmit: PropTypes.func,
};

RegisterForm.defaultProps = {
  initialValues: {},
  onSubmit: null,
};

export default RegisterForm;
