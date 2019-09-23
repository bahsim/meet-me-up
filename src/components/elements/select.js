import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';

import { TextField as TF, MenuItem, Typography } from '@material-ui/core';

const styles = {
  label: {
    fontWeight: 700,
  },
  input: {
    padding: '10px',
  },
};

const Container = styled.div`
  margin-top: 15px;
`;

const SelectBase = ({
  classes, input, label, options, type, placeholder,
}) => (
  <Container>
    <Typography variant="subtitle2" className={classes.label}>
      {label}
    </Typography>
    <TF
      select
      autoComplete="off"
      fullWidth
      inputProps={{
        className: classes.input,
      }}
      label={input.value ? '' : placeholder}
      value={input.value}
      name={input && input.name ? input.name : ''}
      onChange={input.onChange}
      type={type}
    >
      {options.map(({ value, label }) => (
        <MenuItem key={value} value={value}>
          {label}
        </MenuItem>
      ))}
    </TF>
  </Container>
);

SelectBase.propTypes = {
  classes: PropTypes.object.isRequired,
  input: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
};

SelectBase.defaultProps = {
  placeholder: '',
};

export const Select = withStyles(styles)(SelectBase);
