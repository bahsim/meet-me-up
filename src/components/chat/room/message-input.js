import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { AddAPhoto } from '@material-ui/icons';
import { Avatar, Button } from '@material-ui/core';

import { DenyAuthDialog } from '../../dialogs/DenyAuthDialog';
import { DenyPremiumDialog } from '../../dialogs/DenyPremiumDialog';

import { routes } from '../../../constants/routes';

const ButtonConatainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const ButtonEnter = styled(Button)`
  width: 226px
  height: 40px
`;

const AvatarImg = styled(Avatar)`
  margin: 10,
  width: 60,
  height: 60,
`;

const Container = styled.div`
  display: flex;
  padding: 5px;
  width: calc(100% - 10px);
`;

const ActualInput = styled.input`
  width: calc(100% - 50px);
  border: none;
  border-radius: 10px;
  padding: 10px;
  padding-left: 20px;
  padding-right: 20px;
  outline: none;
  box-shadow: 0 1px silver;
  font-size: 18px;
  margin-left: 5px;
`;

const SendButton = styled(Button)`
  min-width: 50px !important;
  width: 50px !important;
  border-radius: 10px !important;
  background-color: var(--primary-bg) !important;
  margin: 0 5px !important;
  margin-right: 0 !important;
  color: white !important;
  padding-left: 20px !important;

  svg {
    margin-left: -3px;
  }
`;

const MessageInputBase = ({ onSendMessage, userInfo, isPremium }) => {
  const [message, setMessage] = useState('');
  const [isAuthDialogOpen, setAuthDialog] = useState(false);
  const [isPremiumDialogOpen, setPremiumDialog] = useState(false);

  const onKeyPress = e => {
    if (e.charCode === 13) {
      submitMessage();
    }
  };

  const onChange = ({ target }) => {
    setMessage(target.value);
  };

  const submitMessage = () => {
    if (!message) return;

    setMessage('');

    if (typeof onSendMessage === 'function') {
      onSendMessage(message);
    }
  };

  const handleAddPhoto = () => {
    if (!isPremium) {
      setPremiumDialog(true);
    }
  };

  return (
    <Container>
      {userInfo ? (
        <>
          <AvatarImg
            src="/statics/avatar.png"
            component={Link}
            to={routes.profile}
          />
          <ActualInput
            data-testid="message-input"
            type="text"
            placeholder="Введите сообщение"
            value={message}
            onKeyPress={onKeyPress}
            onChange={onChange}
          />
          <SendButton
            variant="contained"
            color="primary"
            onClick={submitMessage}
          >
            <AddAPhoto fontSize="small" onClick={handleAddPhoto} />
          </SendButton>
        </>
      ) : (
        <>
          <ButtonConatainer>
            <ButtonEnter
              variant="contained"
              color="secondary"
              onClick={() => setAuthDialog(true)}
            >
              <strong>Войти в чат</strong>
            </ButtonEnter>
          </ButtonConatainer>
          <DenyAuthDialog
            isOpened={isAuthDialogOpen}
            onClose={() => setAuthDialog(false)}
            title="Для продолжения"
          />
        </>
      )}
      <DenyPremiumDialog
        isOpened={isPremiumDialogOpen}
        title="Для добавления фотографий в чат"
        onClose={() => setPremiumDialog(false)}
      />
    </Container>
  );
};

MessageInputBase.propTypes = {
  onSendMessage: PropTypes.func.isRequired,
  userInfo: PropTypes.object,
  isPremium: PropTypes.bool,
};

MessageInputBase.defaultProps = {
  userInfo: null,
  isPremium: false,
};

const mapStateToProps = ({ auth: { userInfo, isPremium } }) => ({
  userInfo,
  isPremium,
});

export const MessageInput = connect(mapStateToProps)(MessageInputBase);
