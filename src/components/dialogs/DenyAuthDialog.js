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

import { routes } from '../../constants/routes';

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

export const DenyAuthDialog = ({ isOpened, onClose, title }) => (
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
          {' Вам необходимо '}
          <strong>зарегистрироваться</strong>
          {' или '}
          <strong>войти в учетную запись</strong>
        </DialogContentText>
        <ButtonStyled
          variant="contained"
          component={Link}
          to={routes.regShort}
          color="secondary"
        >
          <strong>Зарегистрироваться</strong>
        </ButtonStyled>
        <ButtonStyled
          variant="contained"
          component={Link}
          to={routes.login}
          color="primary"
        >
          <strong>Войти в учетную запись</strong>
        </ButtonStyled>
        <ButtonStyled variant="outlined" onClick={onClose} color="default">
          <strong>Закрыть</strong>
        </ButtonStyled>
      </ContentContainer>
    </DialogContent>
  </Dialog>
);

DenyAuthDialog.propTypes = {
  isOpened: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};
