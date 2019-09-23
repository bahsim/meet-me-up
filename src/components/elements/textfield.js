import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';

import {
  TextField as TF, Typography, InputAdornment,
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

const TextFieldBase = ({
  classes, input, label, meta, type, multiline, maxLength, placeholder, endAdornment,
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
      InputProps={{
        endAdornment: (endAdornment
          ? <InputAdornment position="end">{endAdornment}</InputAdornment>
          : null),
      }}
      error={meta && meta.touched && meta.invalid}
      helperText={meta && meta.touched && meta.error}
      name={input && input.name ? input.name : ''}
      value={input && input.value ? input.value : ''}
      onChange={input.onChange}
      type={type}
      multiline={multiline}
      placeholder={placeholder}
    />
  </Container>
);

TextFieldBase.propTypes = {
  classes: PropTypes.object.isRequired,
  input: PropTypes.object.isRequired,
  label: PropTypes.string,
  meta: PropTypes.object,
  type: PropTypes.string.isRequired,
  multiline: PropTypes.bool,
  maxLength: PropTypes.string,
  placeholder: PropTypes.string,
  endAdornment: PropTypes.string,
};

TextFieldBase.defaultProps = {
  meta: {},
  label: '',
  multiline: false,
  maxLength: '100',
  placeholder: '',
  endAdornment: null,
};

export const TextField = withStyles(styles)(TextFieldBase);
