import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import styled from 'styled-components';

import { Typography, Grid } from '@material-ui/core';
import { ArrowBack as ArrowBackIcon } from '@material-ui/icons';

import { Header } from '../../layouts/Header';
import { PageCentral } from '../../layouts/PageCentral';
import { ChatRoom } from '../../components/chat/room';
import { ChatsList } from '../../components/chat/list';

import { routes } from '../../constants/routes';

const Title = styled.div`
  padding-top: 15px;
  padding-bottom: 5px;
  margin-bottom: 5px;
  background-color: #ffffff;
`;

const MODE_LIST = 'MODE_LIST';
const MODE_ROOM = 'MODE_ROOM';

const STATE_LIST = {
  mode: MODE_LIST,
  title: 'Сообщения',
};

const PersonalDialogsBase = ({ history, userInfo }) => {
  const [state, setState] = useState(STATE_LIST);

  if (!userInfo) {
    return <Redirect to={routes.main} />;
  }

  const handleOnReturn = () => {
    if (state.mode === MODE_LIST) {
      history.goBack();
    }
    if (state.mode === MODE_ROOM) {
      setState(STATE_LIST);
    }
  };

  const handleOnOpenRoom = () => {
    setState({
      mode: MODE_ROOM,
      title: 'Маша',
    });
  };

  return (
    <>
      <Header position="fixed" />
      <PageCentral>
        <Title>
          <Grid container justify="center" alignItems="center">
            <Grid item xs={2} onClick={handleOnReturn}>
              <ArrowBackIcon fontSize="large" />
            </Grid>
            <Grid item xs={8}>
              <Typography variant="h5" align="center">
                {state.title}
              </Typography>
            </Grid>
          </Grid>
        </Title>
        {state.mode === MODE_LIST
          && <ChatsList onOpen={handleOnOpenRoom} />}
        {state.mode === MODE_ROOM
          && <ChatRoom />}
      </PageCentral>
    </>
  );
};

PersonalDialogsBase.propTypes = {
  history: PropTypes.object.isRequired,
  userInfo: PropTypes.object,
};

PersonalDialogsBase.defaultProps = {
  userInfo: null,
};

const mapStateToProps = ({ auth: { userInfo } }) => ({
  userInfo,
});

export const PersonalDialogs = withRouter(
  connect(
    mapStateToProps,
  )(PersonalDialogsBase),
);
