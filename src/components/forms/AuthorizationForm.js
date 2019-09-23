import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';

import { authorizationForm } from '../../constants/forms';
import { validateRequired } from '../../utils/redux-form';

import { TextField } from '../elements/textfield';

const AuthorizationFormBase = ({ handleSubmit, mainAction, children }) => (
  <form onSubmit={handleSubmit(mainAction)}>
    <Field
      label="Логин или E-mail"
      name="username"
      type="text"
      maxLength="20"
      placeholder="не указано"
      component={TextField}
      validate={validateRequired}
    />
    <Field
      label="Пароль"
      name="password"
      type="password"
      placeholder="не указано"
      component={TextField}
      validate={validateRequired}
    />
    {children}
  </form>
);

AuthorizationFormBase.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  mainAction: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

const withForm = reduxForm({ form: authorizationForm.name });

export const AuthorizationForm = withForm(AuthorizationFormBase);
