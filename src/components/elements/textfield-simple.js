import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';

import {
  TextField as TF, Typography,
} from '@material-ui/core';

const styles = {
  label: {
    fontWeight: 700,
  },
  input: {
    padding: '10px',
  },
};

const Container = styled.div`
  margin-top: 20px;
`;

const TextFieldSimpleBase = ({
  classes, value, label, type, onChange, multiline, maxLength,
}) => (
  <Container>
    <Typography variant="subtitle2" className={classes.label}>
      {label}
    </Typography>
    <TF
      autoComplete="off"
      fullWidth
      inputProps={{
        className: classes.input,
        maxLength,
      }}
      value={value}
      onChange={onChange}
      type={type}
      multiline={multiline}
    />
  </Container>
);

TextFieldSimpleBase.propTypes = {
  classes: PropTypes.object.isRequired,
  label: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
  type: PropTypes.string.isRequired,
  multiline: PropTypes.bool,
  maxLength: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

TextFieldSimpleBase.defaultProps = {
  label: '',
  multiline: false,
  maxLength: '100',
};

export const TextFieldSimple = withStyles(styles)(TextFieldSimpleBase);
