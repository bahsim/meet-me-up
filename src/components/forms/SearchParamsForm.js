import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import { searchParamsForm } from '../../constants/forms';

import { Slider } from '../elements/slider';
import { Select } from '../elements/select';
import { Checkbox } from '../elements/checkbox';

const PremiumField = styled.div`
  display: flex;
  align-items: baseline;
`;

const SearchParamsFormBase = ({ handleSubmit, mainAction, children }) => (
  <form onSubmit={handleSubmit(mainAction)}>
    <Field
      label="Хочу найти:"
      name="myChoice"
      type="text"
      placeholder="не указано"
      component={Select}
      options={[
        { value: 'girl', label: 'Девушку' },
        { value: 'boy', label: 'Парня' },
      ]}
    />
    <Field
      label="Который (-ая) ищет:"
      name="oppositeChoice"
      type="text"
      placeholder="не указано"
      component={Select}
      options={[
        { value: 'girl', label: 'Девушку' },
        { value: 'boy', label: 'Парня' },
      ]}
    />
    <Field
      label="Позиция в теме:"
      name="position"
      type="text"
      placeholder="не указано"
      component={Select}
      options={[
        { value: 'position1', label: 'Поизция 1' },
        { value: 'position2', label: 'Поизция 2' },
        { value: 'position3', label: 'Поизция 3' },
      ]}
    />
    <Field
      label="Возраст:"
      name="age"
      min={18}
      max={100}
      defaultValues={[25, 45]}
      component={Slider}
    />
    <Field
      label="Город:"
      name="city"
      type="text"
      placeholder="не указано"
      component={Select}
      options={[
        { value: 'moscow', label: 'Москва' },
        { value: 'piter', label: 'Санкт-Петербург' },
      ]}
    />
    <Field name="online" component={Checkbox} label="Сейчас на сайте" />
    <Field name="withPhoto" component={Checkbox} label="С фотографией" />
    <PremiumField>
      <Field name="premium" component={Checkbox} label="Premium аккаунт" />
      <img src="/statics/icons/crown.svg" alt="" />
    </PremiumField>
    {children}
  </form>
);

SearchParamsFormBase.propTypes = {
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
  form: searchParamsForm.name,
});

export const SearchParamsForm = withConnect(withForm(SearchParamsFormBase));
