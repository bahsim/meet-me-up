import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import styled from 'styled-components';

import { Typography } from '@material-ui/core';

import { AppLayout } from '../../layouts/App';
import { PageContent } from '../../layouts/PageContent';
import { PremiumByPhoneForm } from '../../components/forms/PremiumByPhoneForm';
import { PremiumByCardForm } from '../../components/forms/PremiumByCardForm';
import { SelectSimple } from '../../components/elements/select-simple';
import { HeaderBig } from '../../components/elements/header-big';
import { ButtonAction } from '../../components/elements/button-action';

import { routes } from '../../constants/routes';

const Label = styled.div`
  display: flex;
  justify-content: space-between
  margin-bottom: -15px;
`;

const ImageBlock = styled.div`
  display: flex;
  align-items: center;
`;

const PremiumBase = ({ history, userInfo, isPremium }) => {
  const [variant, setVariant] = useState('card');

  const handleFormOnSubmit = () => {
    history.goBack();
  };

  if (!userInfo || isPremium) {
    return <Redirect to={routes.main} />;
  }

  return (
    <AppLayout>
      <HeaderBig value="Покупка платного аккаунта" />
      <PageContent>
        <Label>
          <Typography variant="subtitle2">
            <strong>Оплатить с помощью:</strong>
          </Typography>
          {variant === 'card' && (
            <ImageBlock>
              <img src="/statics/icons/MC.svg" alt="" />
              <img src="/statics/icons/VISA.svg" alt="" />
            </ImageBlock>
          )}
          {variant === 'phone' && (
            <ImageBlock>
              <img src="/statics/icons/tele2.svg" alt="" />
              <img src="/statics/icons/mf.svg" alt="" />
              <img src="/statics/icons/beeline.svg" alt="" />
              <img src="/statics/icons/mtc.svg" alt="" />
            </ImageBlock>
          )}
        </Label>
        <SelectSimple
          value={variant}
          onChange={e => setVariant(e.target.value)}
          options={[
            { value: 'card', label: 'Банковская карта' },
            { value: 'phone', label: 'Со счета телефона (по sms)' },
          ]}
        />
        {variant === 'card' && (
          <PremiumByCardForm mainAction={handleFormOnSubmit}>
            <ButtonAction
              label="Подтвердить и продолжить"
              type="submit"
              color="primary"
              variant="contained"
            />
          </PremiumByCardForm>
        )}
        {variant === 'phone' && (
          <PremiumByPhoneForm mainAction={handleFormOnSubmit}>
            <ButtonAction
              label="Подтвердить и продолжить"
              type="submit"
              color="primary"
              variant="contained"
            />
          </PremiumByPhoneForm>
        )}
      </PageContent>
    </AppLayout>
  );
};

PremiumBase.propTypes = {
  history: PropTypes.object.isRequired,
  userInfo: PropTypes.object,
  isPremium: PropTypes.bool,
};

PremiumBase.defaultProps = {
  userInfo: null,
  isPremium: false,
};

const mapStateToProps = ({ auth: { userInfo, isPremium } }) => ({
  userInfo,
  isPremium,
});

const mapDispatchToProps = dispatch => ({
  send: () => dispatch({ type: 'START_REGISTRATION' }),
});

export const Premium = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(PremiumBase),
);
