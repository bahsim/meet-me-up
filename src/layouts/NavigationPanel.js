import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import {
  Divider,
  SwipeableDrawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';

import {
  AccountCircle as AccountIcon,
  Create as CreateIcon,
  Chat as ChatIcon,
  FindInPage as FindingIcon,
  VolumeUp as VolumeUpIcon,
  Group as GroupIcon,
  ExitToApp as ExitToAppIcon,
} from '@material-ui/icons';

import { routes } from '../constants/routes';

const ListContainer = styled.div`
  min-width: 270px;
`;

const NavigationPanelBase = ({ isOpened, toggle, userInfo }) => (
  <SwipeableDrawer
    anchor="right"
    open={isOpened}
    onClose={toggle}
    onOpen={toggle}
    disableSwipeToOpen={false}
  >
    <ListContainer onClick={toggle}>
      <List>
        <ListItem>
          <ListItemText primary="MeetMeUp" />
        </ListItem>
      </List>
      <Divider />
      <List>
        {userInfo && (
          <ListItem button component={Link} to={routes.profile}>
            <ListItemIcon>
              <AccountIcon />
            </ListItemIcon>
            <ListItemText primary="Профиль" />
          </ListItem>
        )}
        {!userInfo && (
          <ListItem button component={Link} to={routes.reg}>
            <ListItemIcon>
              <CreateIcon />
            </ListItemIcon>
            <ListItemText primary="Регистрация" />
          </ListItem>
        )}
        <ListItem button component={Link} to={routes.chat}>
          <ListItemIcon>
            <ChatIcon color="secondary" />
          </ListItemIcon>
          <ListItemText
            primary="Чат"
            primaryTypographyProps={{ color: 'secondary' }}
          />
        </ListItem>
        <ListItem button component={Link} to={routes.ads}>
          <ListItemIcon>
            <VolumeUpIcon />
          </ListItemIcon>
          <ListItemText primary="Объявления" />
        </ListItem>
        {!userInfo && (
          <ListItem button component={Link} to={routes.login}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Авторизация" />
          </ListItem>
        )}
        <ListItem button component={Link} to={routes.search}>
          <ListItemIcon>
            <FindingIcon />
          </ListItemIcon>
          <ListItemText primary="Хочу найти" />
        </ListItem>
      </List>
      <Divider />
    </ListContainer>
  </SwipeableDrawer>
);

NavigationPanelBase.propTypes = {
  isOpened: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  userInfo: PropTypes.object,
};

NavigationPanelBase.defaultProps = {
  userInfo: null,
};

const mapStateToProps = ({ auth: { userInfo } }) => ({
  userInfo,
});

export const NavigationPanel = withRouter(
  connect(mapStateToProps)(NavigationPanelBase),
);
