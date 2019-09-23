import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import { TextField } from '../elements/textfield';
import { Select } from '../elements/select';

import { premiumByCardForm } from '../../constants/forms';
import { FieldByMask } from '../../utils/redux-form';

const PremiumByCardFormBase = ({ handleSubmit, mainAction, children }) => (
  <form onSubmit={handleSubmit(mainAction)}>
    <Field
      label="Имя:"
      name="firstName"
      type="text"
      placeholder="не указано"
      component={TextField}
    />
    <Field
      label="Фамилия:"
      name="lastName"
      type="text"
      placeholder="не указано"
      component={TextField}
    />
    <FieldByMask
      label="Данные карты:"
      name="cardNumber"
      type="cardNumber"
      placeholder="xxxx xxxx xxxx xxxx"
      endAdornment="номер карты"
      component={TextField}
    />
    <FieldByMask
      label=""
      name="cardDate"
      type="cardDate"
      endAdornment="срок действия"
      component={TextField}
    />
    <FieldByMask
      label=""
      name="cardCode"
      type="cardCode"
      endAdornment="CVV/CVC"
      component={TextField}
    />
    <Field
      label="Адрес:"
      name="adress"
      type="text"
      placeholder="не указано"
      component={TextField}
    />
    <Field
      label="Кв.:"
      name="adressInnerNuber"
      type="text"
      placeholder="не указано"
      component={TextField}
    />
    <Field
      label="Город:"
      name="city"
      type="text"
      placeholder="не указано"
      component={TextField}
    />
    <Field
      label="Область/Штат:"
      name="region"
      type="text"
      placeholder="не указано"
      component={TextField}
    />
    <Field
      label="Почтовый индекс:"
      name="zipCode"
      type="number"
      placeholder="не указано"
      component={TextField}
    />
    <Field
      label="Страна платежа:"
      name="country"
      type="text"
      placeholder="не указано"
      component={Select}
      options={[
        { value: 'ru', label: 'Россия' },
      ]}
    />
    {children}
  </form>
);

PremiumByCardFormBase.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  mainAction: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

const mapDispatchToProps = dispatch => ({
  send: () => dispatch({ type: 'START_REGISTRATION' }),
});

const withConnect = connect(
  null,
  mapDispatchToProps,
);

const withForm = reduxForm({
  form: premiumByCardForm.name,
});

export const PremiumByCardForm = withConnect(withForm(PremiumByCardFormBase));
