import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import { TextField } from '../elements/textfield';
import { Select } from '../elements/select';

import { premiumByPhoneForm } from '../../constants/forms';
import { FieldByMask } from '../../utils/redux-form';

const PremiumByPhoneFormBase = ({ handleSubmit, mainAction, children }) => (
  <form onSubmit={handleSubmit(mainAction)}>
    <Field
      label="Выбор оператора:"
      name="operator"
      type="text"
      placeholder="не указано"
      component={Select}
      options={[
        { value: 'tele2', label: 'Tele 2' },
        { value: 'megaphone', label: 'Мегафон' },
        { value: 'beeline', label: 'Белайн' },
        { value: 'mtc', label: 'МТС' },
      ]}
    />
    <FieldByMask
      label="Номер телефона:"
      type="mobilePhone"
      name="phone"
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

PremiumByPhoneFormBase.propTypes = {
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

const withConnect = connect(mapDispatchToProps);

const withForm = reduxForm({
  form: premiumByPhoneForm.name,
});

export const PremiumByPhoneForm = withConnect(withForm(PremiumByPhoneFormBase));
