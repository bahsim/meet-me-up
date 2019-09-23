import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

import { Typography } from '@material-ui/core';

const Title = styled.div`
  padding-top: 15px;
  padding-bottom: 10px;
  padding-left: 20px;
  padding-right: 20px;
  margin-bottom: 10px;
`;

export const HeaderInnerBase = ({ value }) => (
  <Title>
    <Typography variant="h6">
      <strong>{value}</strong>
    </Typography>
  </Title>
);

HeaderInnerBase.propTypes = {
  value: PropTypes.string.isRequired,
};

export const HeaderInner = withRouter(HeaderInnerBase);
