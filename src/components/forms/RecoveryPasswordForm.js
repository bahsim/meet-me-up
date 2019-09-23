import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';

import { TextField } from '../elements/textfield';

import { recoveryPasswordForm } from '../../constants/forms';
import { validateRequired } from '../../utils/redux-form';

const RecoveryPasswordFormBase = ({ handleSubmit, mainAction, children }) => (
  <form onSubmit={handleSubmit(mainAction)}>
    <Field
      label="Логин или E-mail"
      name="login"
      type="text"
      component={TextField}
      validate={validateRequired}
    />
    {children}
  </form>
);

RecoveryPasswordFormBase.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  mainAction: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

const withForm = reduxForm({
  form: recoveryPasswordForm.name,
});

export const RecoveryPasswordForm = withForm(RecoveryPasswordFormBase);
