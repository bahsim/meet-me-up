import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';

import { registrationProfileForm } from '../../constants/forms';

import { TextField } from '../elements/textfield';
import { Select } from '../elements/select';

const ages = [];
for (let i = 18; i < 101; i++) {
  ages.push({ value: `${i}`, label: `${i} лет` });
}

const RegistrationProfileFormBase = ({
  handleSubmit,
  mainAction,
  children,
}) => (
  <form onSubmit={handleSubmit(mainAction)}>
    <Field
      label="Ваш Никнейм"
      name="nickname"
      type="text"
      placeholder="не указано"
      component={TextField}
    />
    <Field
      label="Ваш пол"
      name="gender"
      type="text"
      placeholder="не указано"
      component={Select}
      options={[
        { value: 'male', label: 'мужской' },
        { value: 'female', label: 'женский' },
      ]}
    />
    <Field
      label="Ваш возвраст"
      name="age"
      type="text"
      placeholder="не указано"
      component={Select}
      options={ages}
    />
    <Field
      label="Ваш город"
      name="city"
      type="text"
      placeholder="не указано"
      component={Select}
      options={[
        { value: 'moscow', label: 'Москва' },
        { value: 'piter', label: 'Санкт-Питербург' },
      ]}
    />
    <Field
      label="Обо мне"
      name="aboutMe"
      type="text"
      placeholder="не указано"
      component={TextField}
      multiline
    />
    {children}
  </form>
);

RegistrationProfileFormBase.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  mainAction: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

const withForm = reduxForm({
  form: registrationProfileForm.name,
});

export const RegistrationProfileForm = withForm(RegistrationProfileFormBase);
