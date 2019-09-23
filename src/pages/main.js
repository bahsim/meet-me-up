import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import styled from 'styled-components';
import smoothscroll from 'smoothscroll-polyfill';

import {
  Typography, Button, Icon, Grid,
} from '@material-ui/core';

import { MainContent } from '../layouts/MainContent';

import { routes } from '../constants/routes';

const ButtonEnter = styled(Button)`
  width: 226px;
  height: 53px;
`;

const ButtonRegister = styled(Button)`
  width: 226px;
  height: 53px;
`;

export const MainBase = ({ userInfo, history }) => {
  useEffect(() => {
    if (userInfo) {
      history.replace(routes.chat);
    }
    smoothscroll.polyfill();
  }, [userInfo]);

  return (
    <MainContent>
      <Typography variant="h4" gutterBottom>
        MeetMeUp
      </Typography>
      <Typography variant="h5" gutterBottom>
        Будем знакомы?!
      </Typography>
      <Grid container alignContent="center" alignItems="center">
        <Grid item xs={2} align="right">
          <Icon>
            <img src="/statics/icons/18old.svg" alt="" />
          </Icon>
        </Grid>
        <Grid item xs={8} align="center">
          <Typography variant="body2" gutterBottom color="secondary">
            <strong>
              .
            </strong>
          </Typography>
        </Grid>
      </Grid>
      {!userInfo && (
        <>
          <ButtonEnter
            variant="contained"
            component={Link}
            to={routes.login}
            color="primary"
          >
            <strong>Войти</strong>
          </ButtonEnter>
          <ButtonRegister
            variant="outlined"
            component={Link}
            to={routes.reg}
            color="primary"
          >
            <strong>Регистрация</strong>
          </ButtonRegister>
        </>
      )}
    </MainContent>
  );
};

MainBase.propTypes = {
  history: PropTypes.object.isRequired,
  userInfo: PropTypes.object,
};

MainBase.defaultProps = {
  userInfo: null,
};

const mapStateToProps = ({ auth: { userInfo } }) => ({
  userInfo,
});

export const Main = withRouter(connect(mapStateToProps)(MainBase));
