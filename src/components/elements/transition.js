import React from 'react';
import PropTypes from 'prop-types';

import { Slide } from '@material-ui/core';

export const Transition = React.forwardRef(
  (
    {
      appear, in: In, children, onEnter, onExited, role, tabIndex, timeout,
    },
    ref,
  ) => (
    <Slide
      direction="up"
      ref={ref}
      in={In}
      appear={appear}
      onEnter={onEnter}
      onExited={onExited}
      role={role}
      tabIndex={tabIndex}
      timeout={timeout}
    >
      {children}
    </Slide>
  ),
);

Transition.propTypes = {
  appear: PropTypes.bool.isRequired,
  in: PropTypes.bool.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
  role: PropTypes.string.isRequired,
  tabIndex: PropTypes.string,
  timeout: PropTypes.object.isRequired,
};

Transition.defaultProps = {
  onEnter: null,
  onExited: null,
  tabIndex: null,
};
