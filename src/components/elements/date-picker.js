import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';

import {
  Typography,
} from '@material-ui/core';

import {
  DateTimePicker as DTP,
} from '@material-ui/pickers';

const styles = {
  label: {
    fontWeight: 700,
  },
  input: {
    padding: '10px',
    paddingTop: '0px',
    marginBottom: '0px',
  },
};

const Container = styled.div`
  margin-top: 20px;
  margin-bottom: -10px;
`;

const DateTimePickerBase = ({
  classes, input, label, meta,
}) => (
  <Container>
    <Typography variant="subtitle2" className={classes.label}>
      {label}
    </Typography>
    <DTP
      disablePast
      disableToolbar
      autoOk
      variant="inline"
      format="DD.MM.YYYY H:mm"
      margin="normal"
      fullWidth
      inputProps={{
        className: classes.input,
      }}
      error={meta && meta.touched && meta.invalid}
      helperText={meta && meta.touched && meta.error}
      name={input && input.name ? input.name : ''}
      value={input && input.value ? input.value : ''}
      onChange={input.onChange}
    />
  </Container>
);

DateTimePickerBase.propTypes = {
  classes: PropTypes.object.isRequired,
  input: PropTypes.object.isRequired,
  label: PropTypes.string,
  meta: PropTypes.object,
};

DateTimePickerBase.defaultProps = {
  meta: {},
  label: '',
};

export const DateTimePicker = withStyles(styles)(DateTimePickerBase);
