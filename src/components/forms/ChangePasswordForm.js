import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';

import { TextField } from '../elements/textfield';

import { changePasswordForm } from '../../constants/forms';
import { validateRequired, validatePasswordMin } from '../../utils/redux-form';

const ChangePasswordFormBase = ({ handleSubmit, mainAction, children }) => (
  <form onSubmit={handleSubmit(mainAction)}>
    <Field
      label="Новый пароль"
      name="new"
      type="password"
      maxLength="20"
      placeholder="не указано"
      component={TextField}
      validate={[validatePasswordMin, validateRequired]}
    />
    <Field
      label="Текущий пароль"
      name="old"
      type="password"
      placeholder="не указано"
      component={TextField}
      validate={validateRequired}
    />
    {children}
  </form>
);

ChangePasswordFormBase.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  mainAction: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

const withForm = reduxForm({
  form: changePasswordForm.name,
});

export const ChangePasswordForm = withForm(ChangePasswordFormBase);
