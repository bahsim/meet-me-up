import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

import { Typography, Grid } from '@material-ui/core';
import { ArrowBack as ArrowBackIcon } from '@material-ui/icons';

const Title = styled.div`
  padding-top: 15px;
  padding-bottom: 5px;
  margin-bottom: 15px;
  background-color: #ffffff;
`;

export const HeaderBigBase = ({ value, history }) => (
  <Title>
    <Grid container justify="center" alignItems="center">
      <Grid item xs={2} onClick={() => history.goBack()}>
        <ArrowBackIcon fontSize="large" />
      </Grid>
      <Grid item xs={8}>
        <Typography variant="h5" gutterBottom align="center">
          {value}
        </Typography>
      </Grid>
    </Grid>
  </Title>
);

HeaderBigBase.propTypes = {
  value: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired,
};

export const HeaderBig = withRouter(HeaderBigBase);
