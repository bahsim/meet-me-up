import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { loginFromSession } from '../modules/auth';
import { MainScreen } from './main-screen';

export const StartupBase = ({ dispatch, children, appLoading }) => {
  useEffect(() => {
    dispatch(loginFromSession());
  }, []);

  const childrenDisplay = appLoading ? { display: 'none' } : { display: '' };
  const loadingDisplay = appLoading ? { display: '' } : { display: 'none' };

  return (
    <>
      <div style={loadingDisplay}>
        <MainScreen />
      </div>
      <div style={childrenDisplay}>{children}</div>
    </>
  );
};

StartupBase.propTypes = {
  dispatch: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  appLoading: PropTypes.bool,
};

StartupBase.defaultProps = {
  appLoading: false,
};

const mapStateToProps = ({ global: { appLoading } }) => ({
  appLoading,
});

export const Startup = connect(mapStateToProps)(StartupBase);
