import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';

import { TextField } from '../elements/textfield';

import { changeEmailForm } from '../../constants/forms';
import { validateRequired, validateEmail } from '../../utils/redux-form';

const ChangeEmailFormBase = ({ handleSubmit, mainAction, children }) => (
  <form onSubmit={handleSubmit(mainAction)}>
    <Field
      label="Новый E-mail"
      name="email"
      type="text"
      placeholder="не указано"
      component={TextField}
      validate={[validateEmail, validateRequired]}
    />
    <Field
      label="Текущий пароль"
      name="password"
      type="password"
      placeholder="не указано"
      component={TextField}
      validate={validateRequired}
    />
    {children}
  </form>
);

ChangeEmailFormBase.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  mainAction: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

const withForm = reduxForm({
  form: changeEmailForm.name,
});

export const ChangeEmailForm = withForm(ChangeEmailFormBase);
