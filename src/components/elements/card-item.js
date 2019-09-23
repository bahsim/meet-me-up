import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import styled from 'styled-components';

import { Typography } from '@material-ui/core';

const Container = styled.div`
  display: flex;
  align-content: stretch;
  margin-top: 15px;
  margin-bottom: 15px;
`;
const IconContainer = styled.div`
  margin-right: 5px;
  margin-top: -3px;
`;

const CardItemBase = ({
  icon: Icon, label, link, to,
}) => (
  <Container>
    <IconContainer>
      <Icon />
    </IconContainer>
    {link ? (
      <Link
        component="button"
        color="textSecondary"
        variant="subtitle2"
        to={link}
      >
        <strong>{label}</strong>
      </Link>
    ) : (
      <Typography variant="body2" color="textSecondary" component="p" to={to}>
        <strong>{label}</strong>
      </Typography>
    )}
  </Container>
);

CardItemBase.propTypes = {
  icon: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  link: PropTypes.bool,
  to: PropTypes.string,
};

CardItemBase.defaultProps = {
  link: null,
  to: null,
};

export const CardItem = withRouter(CardItemBase);
