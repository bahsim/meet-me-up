import React from 'react';
import PropTypes from 'prop-types';

import { Typography, Grid, LinearProgress } from '@material-ui/core';

import { MainScreenContent } from '../layouts/MainScreenContent';

export const MainScreen = ({ children }) => (
  <MainScreenContent>
    <Typography variant="h4" gutterBottom>
      MeetMeUp
    </Typography>
    <Typography variant="h5" gutterBottom>
      Для тех, кто в теме
    </Typography>
    <Grid container alignContent="center" alignItems="center">
      <Grid item xs={12} align="right">
        <LinearProgress />
        <br />
        <LinearProgress color="secondary" />
      </Grid>
    </Grid>
    {children}
  </MainScreenContent>
);

MainScreen.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

MainScreen.defaultProps = {
  children: null,
};
