import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
} from '@material-ui/core';

import { Transition } from '../elements/transition';

const ContentContainer = styled.div`
  flex-grow: 1;
  height: calc(100% - 116px);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  color: #ffffff;
`;

const ButtonStyled = styled(Button)`
  width: 250px
  height: 53px
`;

export const DenyPremiumDialog = ({ isOpened, onClose, title }) => (
  <Dialog
    open={isOpened}
    TransitionComponent={Transition}
    fullScreen
    PaperProps={{
      style: {
        opacity: 0.8,
      },
    }}
  >
    <DialogContent>
      <ContentContainer>
        <DialogContentText variant="h5" color="primary">
          {title}
          {' Вам необходимо приобрести '}
          <strong>Премиум аккаунт</strong>
        </DialogContentText>
        <ButtonStyled
          variant="contained"
          component={Link}
          to="/premium"
          color="secondary"
        >
          <strong>Приобрести аккаунт</strong>
        </ButtonStyled>
        <ButtonStyled variant="contained" color="primary" onClick={onClose}>
          <strong>Продолжить</strong>
        </ButtonStyled>
      </ContentContainer>
    </DialogContent>
  </Dialog>
);

DenyPremiumDialog.propTypes = {
  isOpened: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};
