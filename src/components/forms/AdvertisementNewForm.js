import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';

import { TextField } from '../elements/textfield';

import { advertisementNewForm } from '../../constants/forms';
import { validateRequired } from '../../utils/redux-form';

const AdvertisementNewFormBase = ({ handleSubmit, mainAction, children }) => (
  <form onSubmit={handleSubmit(mainAction)}>
    <Field
      multiline
      label="Текст вашего объявления:"
      name="content"
      type="text"
      placeholder="не указано"
      component={TextField}
      validate={validateRequired}
    />
    {children}
  </form>
);

AdvertisementNewFormBase.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  mainAction: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

const withForm = reduxForm({
  form: advertisementNewForm.name,
});

export const AdvertisementNewForm = withForm(AdvertisementNewFormBase);
