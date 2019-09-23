import React from 'react';
import PropTypes from 'prop-types';

import { Checkbox as ChB, FormControlLabel } from '@material-ui/core';

export const Checkbox = ({ input, label }) => (
  <FormControlLabel
    control={
      <ChB checked={!!input.value} onChange={input.onChange} color="primary" />
    }
    label={label}
  />
);

Checkbox.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
};
