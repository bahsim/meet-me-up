import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

import { Typography, List, ListItem } from '@material-ui/core';
import { DoneOutline as DoneOutlineIcon } from '@material-ui/icons';

import { AppLayout } from '../../layouts/App';
import { PageContentInfo } from '../../layouts/PageContentInfo';
import { ButtonAction } from '../../components/elements/button-action';

import { routes } from '../../constants/routes';

const styles = {
  typography: {
    marginBottom: '20px',
  },
  listItemText: {
    marginLeft: '20px',
  },
  listItem: {
    paddingLeft: '0px',
    alignItems: 'baseline',
  },
};

export const ProfilePremiumBase = ({ classes, userInfo, isPremium }) => {
  if (!userInfo || isPremium) {
    return <Redirect to={routes.main} />;
  }

  return (
    <AppLayout>
      <PageContentInfo>
        <Typography variant="h6" className={classes.typography}>
          Ваш текущий вид аккаунта:
          {' '}
          <strong>Demo-аккаунт</strong>
        </Typography>
        <Typography variant="h6" className={classes.typography}>
          Demo-аккаунт дается при регистрации на сайте для ознакомления с
          возможностями службы знакомств
          {' '}
          <strong>MeetMeUp</strong>
          {' '}
и не имеет
          органичения по сроку действия.
        </Typography>
        <Typography variant="h6">
          Имея Demo-aккаунт
          <br />
          {' '}
          <strong>Вы можете:</strong>
        </Typography>
        <List>
          <ListItem className={classes.listItem}>
            <DoneOutlineIcon color="primary" />
            <Typography variant="h6" className={classes.listItemText}>
              Принимать сообщения от других пользователей сайта, которые
              заинтересовались Вашей анкетой и отвечать на них
            </Typography>
          </ListItem>
          <ListItem className={classes.listItem}>
            <DoneOutlineIcon color="primary" />
            <Typography variant="h6" className={classes.listItemText}>
              Искать людей, которые разместили анкеты в базе знакомств
              MeetMeUp, добавить Вашу анкету в базу знакомств
            </Typography>
          </ListItem>
          <ListItem className={classes.listItem}>
            <DoneOutlineIcon color="primary" />
            <Typography variant="h6" className={classes.listItemText}>
              Оставлять комментарии
            </Typography>
          </ListItem>
        </List>
        <Typography variant="h6" className={classes.typography}>
          Для того, чтобы иметь возможность первым отправлять личные сообщения,
          а также пользоваться другими возможностями сайта без ограничений, Вам
          необходимо активировать
          {' '}
          <strong>Премиум-аккаунт</strong>
          {'.'}
          <img src="/statics/icons/crown.svg" alt="" />
        </Typography>
        <ButtonAction
          label="Приобрести аккаунт"
          color="primary"
          variant="contained"
          component={Link}
          to={routes.premium}
        />
      </PageContentInfo>
    </AppLayout>
  );
};

ProfilePremiumBase.propTypes = {
  classes: PropTypes.object.isRequired,
  userInfo: PropTypes.object,
  isPremium: PropTypes.bool,
};

ProfilePremiumBase.defaultProps = {
  userInfo: null,
  isPremium: false,
};

const mapStateToProps = ({ auth: { userInfo, isPremium } }) => ({
  userInfo,
  isPremium,
});

const mapDispatchToProps = dispatch => ({
  send: () => dispatch({ type: 'RECOVERY_PASSWORD' }),
});

export const ProfilePremium = withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(ProfilePremiumBase),
);
