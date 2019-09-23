import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import moment from 'moment';

import AppBar from '@material-ui/core/AppBar';

import { MessagesList } from './messages-list';
import { MessageInput } from './message-input';

import { routes } from '../../../constants/routes';

const styles = {
  appBar: {
    top: 'auto',
    bottom: 0,
    height: '50px',
  },
};

const chat = {
  messages: [
    {
      id: '1',
      type: 'text',
      isMine: false,
      createdAt: moment('2019-08-25T10:01:15').format('DD.MM.YYYY H:mm:ss'),
      content: 'First message',
      avatar: '/statics/avatar.png',
      profileHref: routes.profileView,
    },
    {
      id: 'img1',
      type: 'image',
      isMine: false,
      createdAt: moment().format('DD.MM.YYYY H:mm:ss'),
      content: '/statics/sample02.jpg',
      avatar: '/statics/avatar.png',
      profileHref: routes.profileView,
    },
    {
      id: '2',
      type: 'text',
      isMine: true,
      createdAt: moment().format('DD.MM.YYYY H:mm:ss'),
      content: 'Message content',
      avatar: '/statics/avatar.png',
      profileHref: routes.profileView,
    },
    {
      id: '3',
      type: 'text',
      isMine: false,
      createdAt: moment().format('DD.MM.YYYY H:mm:ss'),
      content: 'Message content content content content content',
      avatar: '/statics/avatar.png',
      profileHref: routes.profileView,
    },
    {
      id: '4',
      type: 'text',
      isMine: true,
      createdAt: moment().format('DD.MM.YYYY H:mm:ss'),
      content: 'Message content content content content content',
      avatar: '/statics/avatar.png',
      profileHref: routes.profileView,
    },
    {
      id: '5',
      type: 'text',
      isMine: false,
      createdAt: moment().format('DD.MM.YYYY H:mm:ss'),
      content: 'Message content content content content content',
      avatar: '/statics/avatar.png',
      profileHref: routes.profileView,
    },
    {
      id: 'img2',
      type: 'image',
      isMine: true,
      createdAt: moment().format('DD.MM.YYYY H:mm:ss'),
      content: '/statics/sample03.jpg',
      avatar: '/statics/avatar.png',
      profileHref: routes.profileView,
    },
    {
      id: '6',
      type: 'text',
      isMine: true,
      createdAt: moment().format('DD.MM.YYYY H:mm:ss'),
      content: 'Message content content content content content',
      avatar: '/statics/avatar.png',
      profileHref: routes.profileView,
    },
    {
      id: '7',
      type: 'text',
      isMine: false,
      createdAt: moment().format('DD.MM.YYYY H:mm:ss'),
      content: 'Message content content content content content',
      avatar: '/statics/avatar.png',
      profileHref: routes.profileView,
    },
    {
      id: '8',
      type: 'text',
      isMine: true,
      createdAt: moment().format('DD.MM.YYYY H:mm:ss'),
      content: 'Last message',
      avatar: '/statics/avatar.png',
      profileHref: routes.profileView,
    },
  ],
};

class ChatRoomBase extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      step: 1,
      hasMore: true,
      messages: [],
    };
  }

  componentDidUpdate() {
    this.initialFetch();
  }

  componentDidMount() {
    this.initialFetch();
  }

  initialFetch() {
    const { appLoading } = this.props;
    const { messages } = this.state;

    if (appLoading === false && messages.length === 0) {
      this.setState({ messages: chat.messages });
    }
  }

  loadMore = (callback) => {
    const { step: oldStep, messages: oldMessages } = this.state;
    const step = oldStep + 1;
    const hasMore = step < 10;
    const messages = [...chat.messages, ...oldMessages];

    setTimeout(() => {
      this.setState({
        step,
        hasMore,
        messages: messages.map((item, index) => ({ ...item, id: index })),
      }, () => callback());
    }, 1000);
  }

  render() {
    const { classes } = this.props;
    const { hasMore, messages } = this.state;

    return (
      <>
        <MessagesList
          messages={messages}
          hasMore={hasMore}
          loadMore={this.loadMore}
        />
        <AppBar position="fixed" color="primary" className={classes.appBar}>
          <MessageInput onSendMessage={() => {}} />
        </AppBar>
      </>
    );
  }
}

ChatRoomBase.propTypes = {
  classes: PropTypes.object.isRequired,
  appLoading: PropTypes.bool,
};

ChatRoomBase.defaultProps = {
  appLoading: false,
};

const mapStateToProps = ({ global: { appLoading } }) => ({
  appLoading,
});

export const ChatRoom = withStyles(styles)(connect(mapStateToProps)(ChatRoomBase));
