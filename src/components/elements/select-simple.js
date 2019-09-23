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

const SelectSimpleBase = ({
  classes,
  value,
  label,
  options,
  type,
  onChange,
}) => (
  <Container>
    <Typography variant="subtitle2" className={classes.label}>
      {label}
    </Typography>
    <TF
      select
      autoComplete="off"
      fullWidth
      inputProps={{ className: classes.input }}
      value={value}
      onChange={onChange}
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

SelectSimpleBase.propTypes = {
  classes: PropTypes.object.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  type: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

SelectSimpleBase.defaultProps = {
  label: '',
  type: '',
};

export const SelectSimple = withStyles(styles)(SelectSimpleBase);
