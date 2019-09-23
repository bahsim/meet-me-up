import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { Header } from './Header';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  overflow: hidden;
  height: 100vh;
  background: url('/statics/background.jpg') no-repeat center center;
  background-size: cover;
`;

export const ContentContainer = styled.div`
  flex-grow: 1;
  height: calc(100% - 116px);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  color: #ffffff;
`;

export const MainContent = ({ children }) => (
  <Container>
    <Header position="static" />
    <ContentContainer>{children}</ContentContainer>
  </Container>
);

MainContent.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
