import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import styled from 'styled-components';

import { AppLayout } from '../../layouts/App';
import { PageContent } from '../../layouts/PageContent';
import { ChangePasswordForm } from '../../components/forms/ChangePasswordForm';
import { ButtonAction } from '../../components/elements/button-action';

import { routes } from '../../constants/routes';

const Container = styled.div`
  margin-top: 80px;
`;

const ChangePasswordBase = ({ history, userInfo }) => {
  const handleFormOnSubmit = () => {
    history.goBack();
  };

  if (!userInfo) {
    return <Redirect to={routes.main} />;
  }

  return (
    <AppLayout>
      <Container>
        <PageContent>
          <ChangePasswordForm mainAction={handleFormOnSubmit}>
            <ButtonAction
              label="Изменить"
              type="submit"
              color="primary"
              variant="contained"
            />
          </ChangePasswordForm>
        </PageContent>
      </Container>
    </AppLayout>
  );
};

ChangePasswordBase.propTypes = {
  history: PropTypes.object.isRequired,
  userInfo: PropTypes.object,
};

ChangePasswordBase.defaultProps = {
  userInfo: null,
};

const mapStateToProps = ({ auth: { userInfo } }) => ({
  userInfo,
});

const mapDispatchToProps = dispatch => ({
  send: () => dispatch({ type: 'RECOVERY_PASSWORD' }),
});

export const ChangePassword = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(ChangePasswordBase),
);
