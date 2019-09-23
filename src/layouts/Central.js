import React from 'react';
import PropTypes from 'prop-types';

import { Header } from './Header';

export const CentralLayout = ({ children }) => (
  <>
    <Header position="fixed" />
    {children}
  </>
);

CentralLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
