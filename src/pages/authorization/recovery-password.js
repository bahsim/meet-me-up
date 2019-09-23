import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';

import { AppLayout } from '../../layouts/App';
import { PageContent } from '../../layouts/PageContent';
import { RecoveryPasswordForm } from '../../components/forms/RecoveryPasswordForm';
import { HeaderInner } from '../../components/elements/header-inner';
import { ButtonAction } from '../../components/elements/button-action';

import { routes } from '../../constants/routes';

const RecoveryPasswordBase = ({ history, userInfo }) => {
  const handleFormOnSubmit = () => {
    history.goBack();
  };

  if (userInfo) {
    return <Redirect to={routes.main} />;
  }

  return (
    <AppLayout>
      <HeaderInner value="Для восстановления пароля пожалуйста укажите свой логин или email" />
      <PageContent>
        <RecoveryPasswordForm mainAction={handleFormOnSubmit}>
          <ButtonAction
            label="Сбросить пароль"
            type="submit"
            color="primary"
            variant="contained"
          />
        </RecoveryPasswordForm>
      </PageContent>
    </AppLayout>
  );
};

RecoveryPasswordBase.propTypes = {
  history: PropTypes.object.isRequired,
  userInfo: PropTypes.object,
};

RecoveryPasswordBase.defaultProps = {
  userInfo: null,
};

const mapStateToProps = ({ auth: { userInfo } }) => ({
  userInfo,
});

const mapDispatchToProps = dispatch => ({
  send: () => dispatch({ type: 'RECOVERY_PASSWORD' }),
});

export const RecoveryPassword = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(RecoveryPasswordBase),
);
