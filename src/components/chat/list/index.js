import React from 'react';
import PropTypes from 'prop-types';
import { List, ListItem } from '@material-ui/core';
import styled from 'styled-components';
import moment from 'moment';

const Container = styled.div`
  position: relative;
  display: block;
  flex: 2;
  overflow-y: overlay;
  height: calc(100vh - 135px);
`;

const StyledList = styled(List)`
  padding: 0 !important;
`;

const StyledListItem = styled(ListItem)`
  height: 76px;
  padding: 0 15px;
  display: flex;
`;

const ChatPicture = styled.img`
  height: 50px;
  width: 50px;
  object-fit: cover;
  border-radius: 50%;
`;

const ChatInfo = styled.div`
  width: calc(100% - 60px);
  height: 46px;
  padding: 15px 0;
  margin-left: 10px;
  border-bottom: 0.5px solid silver;
  position: relative;
`;

const ChatName = styled.div`
  margin-top: 5px;
`;

const MessageContent = styled.div`
  color: gray;
  font-size: 15px;
  margin-top: 5px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const MessageDate = styled.div`
  position: absolute;
  color: gray;
  top: 20px;
  right: 0;
  font-size: 13px;
`;

const chats = [
  {
    id: '1',
    avatar: '/statics/avatar.png',
    name: 'Name Surname',
    lastMessage: {
      content: 'Message content content content',
      createdAt: moment('2019-08-25T10:01:15').format('DD.MM.YY H:mm:ss'),
    },
  },
  {
    id: '2',
    avatar: '/statics/avatar.png',
    name: 'Name Surname',
    lastMessage: {
      content: 'Message content content content',
      createdAt: moment('2019-08-25T10:01:15').format('DD.MM.YY H:mm:ss'),
    },
  },
  {
    id: '3',
    avatar: '/statics/avatar.png',
    name: 'Name Surname',
    lastMessage: {
      content: 'Message content content content',
      createdAt: moment('2019-08-25T10:01:15').format('DD.MM.YY H:mm:ss'),
    },
  },
  {
    id: '4',
    avatar: '/statics/avatar.png',
    name: 'Name Surname',
    lastMessage: {
      content: 'Message content content content',
      createdAt: moment('2019-08-25T10:01:15').format('DD.MM.YY H:mm:ss'),
    },
  },
  {
    id: '5',
    avatar: '/statics/avatar.png',
    name: 'Name Surname',
    lastMessage: {
      content: 'Message content content content',
      createdAt: moment('2019-08-25T10:01:15').format('DD.MM.YY H:mm:ss'),
    },
  },
  {
    id: '6',
    avatar: '/statics/avatar.png',
    name: 'Name Surname',
    lastMessage: {
      content: 'Message content content content',
      createdAt: moment('2019-08-25T10:01:15').format('DD.MM.YY H:mm:ss'),
    },
  },
  {
    id: '7',
    avatar: '/statics/avatar.png',
    name: 'Name Surname',
    lastMessage: {
      content: 'Message content content content',
      createdAt: moment('2019-08-25T10:01:15').format('DD.MM.YY H:mm:ss'),
    },
  },
];

export const ChatsList = ({ onOpen }) => (
  <Container>
    <StyledList>
      {chats.map((chat) => (
        <StyledListItem
          key={chat.id}
          button
          onClick={onOpen}
        >
          <ChatPicture
            src={chat.avatar}
            alt="Profile"
          />
          <ChatInfo>
            <ChatName>{chat.name}</ChatName>
            {chat.lastMessage && (
              <>
                <MessageContent>
                  {chat.lastMessage.content}
                </MessageContent>
                <MessageDate>
                  {chat.lastMessage.createdAt}
                </MessageDate>
              </>
            )}
          </ChatInfo>
        </StyledListItem>
      ))}
    </StyledList>
  </Container>
);

ChatsList.propTypes = {
  onOpen: PropTypes.func.isRequired,
};
