import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import {
  ListItemSecondaryAction,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@material-ui/core';

import { AppLayout } from '../../layouts/App';
import { HeaderInner } from '../../components/elements/header-inner';

import { routes } from '../../constants/routes';

export const ProfileSettingsBase = ({ userInfo }) => {
  if (!userInfo) {
    return <Redirect to={routes.main} />;
  }

  return (
    <AppLayout>
      <HeaderInner value="Настройки аккаунта" />
      <List>
        <ListItem>
          <ListItemText
            primary="Ваш текущий E-mail:"
            secondary="Dariya2345@gmail.com"
          />
          <ListItemSecondaryAction>
            <Button size="small" component={Link} to="/profile/change-email">
              изменить
            </Button>
          </ListItemSecondaryAction>
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText primary="Пароль:" secondary="****************" />
          <ListItemSecondaryAction>
            <Button size="small" component={Link} to="/profile/change-password">
              изменить
            </Button>
          </ListItemSecondaryAction>
        </ListItem>
        <Divider />
      </List>
    </AppLayout>
  );
};

ProfileSettingsBase.propTypes = {
  userInfo: PropTypes.object,
};

ProfileSettingsBase.defaultProps = {
  userInfo: null,
};

const mapStateToProps = ({ auth: { userInfo } }) => ({
  userInfo,
});

const mapDispatchToProps = dispatch => ({
  send: () => dispatch({ type: 'RECOVERY_PASSWORD' }),
});

export const ProfileSettings = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileSettingsBase);
