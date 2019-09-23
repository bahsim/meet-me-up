import React from 'react';
import PropTypes from 'prop-types';
import { createTextMask } from 'redux-form-input-masks';
import { Field } from 'redux-form';

export const validateRequired = value => (
  value ? undefined : 'Поле пусто'
);

export const validateUsernameMin = value => (
  value && value.length >= 2 ? undefined : 'Не менее 2-х символов'
);

export const validatePasswordMin = value => (
  value && value.length >= 4 ? undefined : 'Не менее 4-х символов'
);

export const validateEmail = value => (
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Неверный E-mail' : undefined
);

const mobilePhoneMask = createTextMask({
  pattern: '+7 (999) 999-99-99',
});
const cardNumberMask = createTextMask({
  pattern: '9999-9999-9999-9999',
});
const cardDateMask = createTextMask({
  pattern: '99/99',
});
const cardCodeMask = createTextMask({
  pattern: '999',
});

export const FieldByMask = ({
  label, name, component, type, endAdornment,
}) => {
  let mask;
  switch (type) {
    case 'mobilePhone':
      mask = mobilePhoneMask;
      break;
    case 'cardNumber':
      mask = cardNumberMask;
      break;
    case 'cardDate':
      mask = cardDateMask;
      break;
    case 'cardCode':
      mask = cardCodeMask;
      break;
    default:
      mask = mobilePhoneMask;
  }
  const {
    format, normalize, onKeyDown, onChange, onFocus,
  } = mask;

  return (
    <Field
      type="text"
      label={label}
      name={name}
      component={component}
      endAdornment={endAdornment}
      format={format}
      normalize={normalize}
      onKeyDown={onKeyDown}
      onChange={onChange}
      onFocus={onFocus}
    />
  );
};

FieldByMask.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  component: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  endAdornment: PropTypes.string,
};

FieldByMask.defaultProps = {
  endAdornment: null,
};
