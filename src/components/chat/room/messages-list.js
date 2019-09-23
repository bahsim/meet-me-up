import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import styled, { css } from 'styled-components';
import {
  Box, Avatar, CircularProgress, Fab,
} from '@material-ui/core';
import { ArrowDownward as ArrowDownwardIcon } from '@material-ui/icons';

import { useInfiniteScrollUp } from '../../hooks/use-infinite-scroll-up';
import { useAdjustedScrollUp } from '../../hooks/use-adjusted-scroll-up';

import { ImageLightbox } from '../../elements/image-lightbox';
import { Image } from '../../elements/Image';
import { DenyAuthDialog } from '../../dialogs/DenyAuthDialog';
import { DenyPremiumDialog } from '../../dialogs/DenyPremiumDialog';

const AvatarImg = styled(Avatar)`
  margin: 10,
  width: 60,
  height: 60,
  padding:
`;

const Container = styled.div`
  position: relative;
  display: block;
  flex: 2;
  overflow-y: overlay;
  padding: 0 15px;
  height: calc(100vh - 172px);
`;

const ButtonDownContainer = styled.div`
  position: absolute;
  bottom: 75px;
  right: 20px;
`;

const LoadingMore = styled.div`
  height: 30px;
  line-height: 30px;
  padding-bottom: 15px;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  text-align: center;
`;

const MessageItem = styled.div`
  display: inline-block;
  position: relative;
  max-width: 100%;
  border-radius: 7px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
  margin-top: 10px;
  margin-bottom: 10px;
  clear: both;
  background-color: #ffffff;

  &::after {
    content: '';
    display: table;
    clear: both;
  }

  &::before {
    content: '';
    position: absolute;
    bottom: 3px;
    width: 12px;
    height: 19px;
    background-position: 50% 50%;
    background-repeat: no-repeat;
    background-size: contain;
  }

  ${props => (props.isMine
    ? css`
          float: right;
          margin-right: 10px;

          &::before {
            right: -11px;
          }
        `
    : css`
          float: left;
          margin-left: 10px;

          &::before {
            left: -11px;
          }
        `)}
`;

const Contents = styled.div`
  padding: 5px 7px;
  word-wrap: break-word;

  &::after {
    content: ' \\00a0\\00a0\\00a0\\00a0\\00a0\\00a0\\00a0\\00a0\\00a0\\00a0\\00a0\\00a0\\00a0\\00a0
                \\00a0\\00a0\\00a0\\00a0\\00a0\\00a0\\00a0\\00a0\\00a0\\00a0\\00a0\\00a0\\00a0\\00a0
                \\00a0\\00a0\\00a0\\00a0\\00a0\\00a0\\00a0\\00a0\\00a0\\00a0\\00a0\\00a0\\00a0\\00a0';
    display: inline;
  }
`;

const Timestamp = styled.div`
  padding: 5px 7px;
  position: absolute;
  width: auto;
  bottom: 2px;
  right: 7px;
  color: gray;
  font-size: 12px;

  &::before {
    content: ' \\00a0\\00a0\\00a0\\00a0\\00a0\\00a0\\00a0\\00a0\\00a0\\00a0
                \\00a0\\00a0\\00a0\\00a0\\00a0\\00a0\\00a0\\00a0\\00a0';
    display: inline;
  }
`;

const MessagesListBase = ({
  messages,
  loadMore,
  hasMore,
  userInfo,
  isPremium,
}) => {
  const selfRef = useRef(null);
  const adjustScroll = useAdjustedScrollUp(selfRef);
  const [fetching, stopFetching, buttonDown] = useInfiniteScrollUp({
    onLoadMore: loadMore,
    hasMore,
    ref: selfRef,
    adjustScroll,
  });

  const [lightBox, setLightBox] = useState({ photoIndex: 0, isOpen: false });
  const [isAuthDialogOpen, setAuthDialog] = useState(false);
  const [isPremiumDialogOpen, setPremiumDialog] = useState(false);

  useEffect(() => {
    if (!selfRef.current) return;

    if (!fetching) {
      // scroll to the most recent message, if there are new messages
      if (messages.some(({ newItem }) => newItem === true)) {
        adjustScroll(true);
      }
    }
  }, [messages.length, selfRef, fetching, stopFetching, adjustScroll]);

  useEffect(() => {
    setTimeout(() => {
      adjustScroll();
    }, 2000);
  }, []);

  const handleOpenImage = () => {
    if (userInfo && isPremium) {
      setLightBox({ photoIndex: 0, isOpen: true });
    } else if (userInfo && !isPremium) {
      setPremiumDialog(true);
    } else {
      setAuthDialog(true);
    }
  };

  return (
    <>
      <Container ref={selfRef}>
        {fetching
          && (
            <LoadingMore>
              <CircularProgress />
            </LoadingMore>
          )}
        {messages.map(message => (
          <Box
            display="flex"
            flexDirection={message.isMine ? 'row-reverse' : 'row'}
            alignItems="center"
            key={message.id}
          >
            <AvatarImg
              src={message.avatar}
              component={Link}
              to={message.profileHref}
            />
            <MessageItem avatar={message.avatar} isMine={message.isMine}>
              {message.type === 'text' && (
                <>
                  <Contents>{message.content}</Contents>
                  <Timestamp>
                    {message.createdAt}
                    {/* {format(message.createdAt, 'HH:mm')} */}
                  </Timestamp>
                </>
              )}
              {message.type === 'image' && (
                <>
                  <Contents>
                    <Image
                      src={message.content}
                      style={{ width: '225px' }}
                      onClick={handleOpenImage}
                    />
                    <Timestamp>{message.createdAt}</Timestamp>
                  </Contents>
                </>
              )}
            </MessageItem>
          </Box>
        ))}
        <ImageLightbox
          onClose={() => setLightBox({ photoIndex: 0, isOpen: false })}
          setIndex={index => setLightBox({ ...lightBox, photoIndex: index })}
          isOpen={lightBox.isOpen}
          photoIndex={lightBox.photoIndex}
          images={[
            '/statics/image.png',
            '/statics/image.png',
            '/statics/image.png',
          ]}
        />
      </Container>
      <DenyAuthDialog
        isOpened={isAuthDialogOpen}
        onClose={() => setAuthDialog(false)}
        title="Для продолжения"
      />
      <DenyPremiumDialog
        isOpened={isPremiumDialogOpen}
        onClose={() => setPremiumDialog(false)}
        title="Для просмотра фотографий в чате"
      />
      {buttonDown
        && (
          <ButtonDownContainer onClick={() => adjustScroll(true)}>
            <Fab color="primary">
              <ArrowDownwardIcon />
            </Fab>
          </ButtonDownContainer>
        )}
    </>
  );
};

MessagesListBase.propTypes = {
  userInfo: PropTypes.object,
  isPremium: PropTypes.bool,
  messages: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  loadMore: PropTypes.func.isRequired,
  hasMore: PropTypes.bool.isRequired,
};

MessagesListBase.defaultProps = {
  userInfo: null,
  isPremium: false,
};

const mapStateToProps = ({ auth: { userInfo, isPremium } }) => ({
  userInfo,
  isPremium,
});

export const MessagesList = connect(mapStateToProps)(MessagesListBase);
