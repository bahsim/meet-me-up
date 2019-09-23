import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';

import { loginUser } from '../../modules/auth';

import { AppLayout } from '../../layouts/App';
import { PageContent } from '../../layouts/PageContent';
import { AuthorizationForm } from '../../components/forms/AuthorizationForm';
import { HeaderBig } from '../../components/elements/header-big';
import { ButtonAction } from '../../components/elements/button-action';

import { routes } from '../../constants/routes';

const AuthorizationBase = ({ userInfo, dispatch }) => {
  const handleFormOnSubmit = () => {
    dispatch(loginUser());
  };

  if (userInfo) {
    return <Redirect to={routes.main} />;
  }

  return (
    <AppLayout>
      <HeaderBig value="Авторизация" />
      <PageContent>
        <AuthorizationForm mainAction={handleFormOnSubmit}>
          <ButtonAction
            label="Забыли пароль?"
            color="primary"
            component={Link}
            to={routes.recovery}
          />
          <ButtonAction
            label="Войти"
            type="submit"
            color="primary"
            variant="contained"
          />
          <ButtonAction
            label="Зарегистрироваться"
            color="default"
            variant="outlined"
            component={Link}
            to={routes.reg}
          />
        </AuthorizationForm>
      </PageContent>
    </AppLayout>
  );
};

AuthorizationBase.propTypes = {
  dispatch: PropTypes.func.isRequired,
  userInfo: PropTypes.object,
};

AuthorizationBase.defaultProps = {
  userInfo: null,
};

const mapStateToProps = ({ auth: { userInfo } }) => ({
  userInfo,
});

export const Authorization = connect(
  mapStateToProps,
  null,
)(AuthorizationBase);
