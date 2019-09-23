import React, { useState } from 'react';
import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import {
  AppBar,
  Typography,
  Toolbar as MaterialToolbar,
  IconButton,
} from '@material-ui/core';

import { Menu as MenuIcon } from '@material-ui/icons';

import { NavigationPanel } from './NavigationPanel';

const styles = {
  AppBar: {
    zIndex: 1000,
  },
};
const Container = styled(AppBar)`
  min-height: 5vh;
`;

const Title = styled(Typography)`
  && {
    margin-left: 10px;
    font-weight: bold;
  }
`;

const Toolbar = styled(MaterialToolbar)`
  && {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const LineBlock = styled.div`
  display: flex;
  align-items: center;
`;

const HeaderBase = ({ position, classes }) => {
  const [isPanelOpened, setPanelOpen] = useState(false);

  const togglePanel = event => {
    if (
      event
      && event.type === 'keydown'
      && (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setPanelOpen(!isPanelOpened);
  };

  return (
    <Container position={position} color="primary" className={classes.AppBar}>
      <Toolbar>
        <LineBlock>
          <Title type="title">MeetMeUp</Title>
        </LineBlock>
        <LineBlock>
          <IconButton onClick={togglePanel} color="default" aria-label="Menu">
            <MenuIcon />
          </IconButton>
        </LineBlock>
      </Toolbar>
      <NavigationPanel isOpened={isPanelOpened} toggle={togglePanel} />
    </Container>
  );
};

HeaderBase.propTypes = {
  position: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
};

export const Header = withStyles(styles)(HeaderBase);
