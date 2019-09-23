import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Content = styled.div`
  margin-top: 60px;
  max-height: calc(100vh - 60px);
`;

export const PageCentral = ({ children }) => {
  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <Content>{children}</Content>
  );
};

PageCentral.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
