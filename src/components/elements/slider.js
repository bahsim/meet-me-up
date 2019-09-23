import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';

import { Slider as Sldr, Typography } from '@material-ui/core';

const styles = {
  label: {
    fontWeight: 700,
  },
};

const Container = styled.div`
  margin-top: 15px;
`;

const SliderBase = ({
  classes, input, label, min, max, defaultValues,
}) => (
  <Container>
    <Typography variant="subtitle2" className={classes.label}>
      {label}
    </Typography>
    <br />
    <br />
    <br />
    <Sldr
      valueLabelDisplay="on"
      min={min}
      max={max}
      name={input && input.name ? input.name : ''}
      value={input.value ? input.value : defaultValues}
      onChange={(...args) => input.onChange(args[1])}
    />
  </Container>
);

SliderBase.propTypes = {
  classes: PropTypes.object.isRequired,
  input: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  defaultValues: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.number),
  ]).isRequired,
  min: PropTypes.number,
  max: PropTypes.number,
};

SliderBase.defaultProps = {
  min: 1,
  max: 100,
};

export const Slider = withStyles(styles)(SliderBase);
