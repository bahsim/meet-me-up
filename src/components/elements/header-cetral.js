import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

import { Typography } from '@material-ui/core';
// import { RadioButtonChecked, RadioButtonUnchecked } from '@material-ui/icons';

const Title = styled.div`
  display: flex;
  justify-content: space-evenly
  align-items: center
  padding-top: 15px;
  padding-bottom: 10px;
  margin-top: -4px;
  margin-bottom: 10px;
  background-color: #ffffff
`;

// const dotsArray = ({ step, total }) => {
//   const result = [];
//   for (let i = 1; i <= total; i++) {
//     result[i - 1] = i === step;
//   }
//   return result;
// };

export const HeaderCentralBase = ({ value }) => (
// export const HeaderCentralBase = ({ value, step, total }) => (
  <Title>
    <Typography variant="h5">{value}</Typography>
    {/* <Typography variant="h5">
      {dotsArray({ step, total }).map((item, index) => (item ? (
        <RadioButtonChecked key={index} fontSize="small" color="primary" />
      ) : (
        <RadioButtonUnchecked key={index} fontSize="small" color="disabled" />
      )),
      )}
    </Typography> */}
  </Title>
);

HeaderCentralBase.propTypes = {
  value: PropTypes.string.isRequired,
  // step: PropTypes.number.isRequired,
  // total: PropTypes.number.isRequired,
};

export const HeaderCentral = withRouter(HeaderCentralBase);
