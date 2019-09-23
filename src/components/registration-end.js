import React from 'react';
import PropTypes from 'prop-types';

import { Typography } from '@material-ui/core';

export const RegistrationEnd = ({ children }) => (
  <>
    <Typography variant="h6" gutterBottom>
      <strong>Спасибо за регистрацию!</strong>
    </Typography>
    <Typography variant="subtitle1" gutterBottom>
      На Ваш E-mail было отправлено письмо с паролем.
    </Typography>
    <Typography variant="subtitle1">С уважением, команда</Typography>
    <Typography variant="subtitle1">
      <strong>MeetMeUp</strong>
    </Typography>
    {children}
  </>
);

RegistrationEnd.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
