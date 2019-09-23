import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';

import {
  List, ListItem, ListItemText, Divider,
} from '@material-ui/core';

import { AppLayout } from '../../layouts/App';
import { PageContent } from '../../layouts/PageContent';
import { ChangeEmailForm } from '../../components/forms/ChangeEmailForm';
import { ButtonAction } from '../../components/elements/button-action';

import { routes } from '../../constants/routes';

const ChangeEmailBase = ({ history, userInfo }) => {
  const handleFormOnSubmit = () => {
    history.goBack();
  };

  if (!userInfo) {
    return <Redirect to={routes.main} />;
  }

  return (
    <AppLayout>
      <List>
        <ListItem>
          <ListItemText
            primary="Ваш текущий E-mail:"
            secondary="Dariya2345@gmail.com"
          />
        </ListItem>
        <Divider />
      </List>
      <PageContent>
        <ChangeEmailForm mainAction={handleFormOnSubmit}>
          <ButtonAction
            label="Изменить"
            type="submit"
            color="primary"
            variant="contained"
          />
        </ChangeEmailForm>
      </PageContent>
    </AppLayout>
  );
};

ChangeEmailBase.propTypes = {
  history: PropTypes.object.isRequired,
  userInfo: PropTypes.object,
};

ChangeEmailBase.defaultProps = {
  userInfo: null,
};

const mapStateToProps = ({ auth: { userInfo } }) => ({
  userInfo,
});

const mapDispatchToProps = dispatch => ({
  send: () => dispatch({ type: 'RECOVERY_PASSWORD' }),
});

export const ChangeEmail = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(ChangeEmailBase),
);
