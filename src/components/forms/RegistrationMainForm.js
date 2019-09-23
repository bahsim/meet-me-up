import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';

import { TextField } from '../elements/textfield';

import { registrationMainForm } from '../../constants/forms';
import {
  validateRequired, validateEmail, validateUsernameMin,
} from '../../utils/redux-form';

const RegistrationMainFormBase = ({ handleSubmit, mainAction, children }) => (
  <form onSubmit={handleSubmit(mainAction)}>
    <Field
      label="Логин - Никнейм"
      name="username"
      type="text"
      autoFocus
      placeholder="не указано"
      maxLength="20"
      component={TextField}
      validate={validateUsernameMin}
    />
    <Field
      label="E-mail"
      name="email"
      type="text"
      placeholder="не указано"
      component={TextField}
      validate={[validateEmail, validateRequired]}
    />
    {children}
  </form>
);

RegistrationMainFormBase.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  mainAction: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

const withForm = reduxForm({
  form: registrationMainForm.name,
});

export const RegistrationMainForm = withForm(RegistrationMainFormBase);
