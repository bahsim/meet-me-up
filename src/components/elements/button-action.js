import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

import { Button } from '@material-ui/core';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  margin: 20px;
`;

const Element = styled(Button)`
  min-width: 100%;
  height: 53px;
  border-radius: 9px;
`;

const ButtonActionBase = ({
  label,
  variant,
  color,
  onClick,
  component,
  type,
  to,
  containerStyle,
}) => (
  <Container style={containerStyle}>
    <Element
      fullWidth
      type={type}
      variant={variant}
      color={color}
      onClick={onClick}
      component={component}
      to={to}
    >
      <strong>{label}</strong>
    </Element>
  </Container>
);

ButtonActionBase.propTypes = {
  label: PropTypes.string.isRequired,
  variant: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func,
  component: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.func,
    PropTypes.string,
  ]),
  type: PropTypes.string,
  to: PropTypes.string,
  containerStyle: PropTypes.object,
};

ButtonActionBase.defaultProps = {
  variant: 'text',
  color: null,
  onClick: null,
  component: 'button',
  type: 'button',
  to: null,
  containerStyle: null,
};

export const ButtonAction = withRouter(ButtonActionBase);
