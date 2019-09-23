import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link, Redirect } from 'react-router-dom';

import {
  Email as EmailIcon,
  Settings as SettingsIcon,
  ListAlt as ListAltIcon,
  ExitToApp as ExitToAppIcon,
  AddAPhoto as AddAPhotoIcon,
} from '@material-ui/icons';

import {
  ListItemIcon,
  Badge,
  List,
  ListItem,
  ListItemText,
  Fab,
} from '@material-ui/core';

import { AppLayout } from '../../layouts/App';
import { PhotoContainer } from '../../components/elements/photo-container';
import { ListItemEditable } from '../../components/elements/list-item-editable';

import { routes } from '../../constants/routes';

const AddPhotoContainer = styled.div`
  display: flex;
  float: right;
  margin-top: -50px;
  margin-right: 15px;
`;

const images = [
  '/statics/sample01.jpg',
  '/statics/sample02.jpg',
  '/statics/sample01.jpg',
  '/statics/sample02.jpg',
  '/statics/sample01.jpg',
];

const ages = [];
for (let i = 18; i < 101; i++) {
  ages.push({ value: `${i}`, label: `${i} лет` });
}

export const ProfileBase = ({ userInfo, isPremium }) => {
  const handleClickExit = () => {
    window.location = routes.logout;
  };

  if (!userInfo) {
    return <Redirect to={routes.main} />;
  }

  return (
    <AppLayout>
      <PhotoContainer
        isMine
        images={images}
        style={{ width: '225px', padding: '10px' }}
      />
      <AddPhotoContainer>
        <Fab color="primary">
          <AddAPhotoIcon />
        </Fab>
      </AddPhotoContainer>
      <List>
        <ListItemEditable
          label="Никнейм:"
          type="textfield"
          inputType="text"
          value="Маша"
          onSave={(value) => console.log(value)}
        />
        <ListItemEditable
          label="Возраст:"
          type="select"
          inputType="number"
          value={{
            value: '25',
            label: '25 лет',
          }}
          onSave={(value) => console.log(value)}
          options={ages}
        />
        <ListItemEditable
          label="Город:"
          type="select"
          value={{
            value: 'moscow',
            label: 'Москва',
          }}
          onSave={(value) => console.log(value)}
          options={[
            { value: 'moscow', label: 'Москва' },
            { value: 'piter', label: 'Санкт-Питербург' },
          ]}
        />
        <ListItemEditable
          label="Пол:"
          type="select"
          value={{
            value: 'female',
            label: 'Женский',
          }}
          onSave={(value) => console.log(value)}
          options={[
            { value: 'male', label: 'Мужской' },
            { value: 'female', label: 'Женский' },
          ]}
        />
      </List>
      <List>
        <ListItem button component={Link} to={routes.personaDialogs}>
          <ListItemIcon>
            <Badge badgeContent={10} color="secondary">
              <EmailIcon color="primary" />
            </Badge>
          </ListItemIcon>
          <ListItemText primary="Сообщения" />
        </ListItem>
        <ListItem button component={Link} to={routes.settings}>
          <ListItemIcon>
            <SettingsIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="Настройки аккаунта" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <ListAltIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="Редактирование анкеты" />
        </ListItem>
        {!isPremium && (
          <ListItem button component={Link} to={routes.profilePremium}>
            <ListItemIcon>
              <img src="/statics/icons/crown.svg" alt="" />
            </ListItemIcon>
            <ListItemText primary="Премиум аккаунт" />
          </ListItem>
        )}
        <ListItem button onClick={() => handleClickExit()}>
          <ListItemIcon>
            <ExitToAppIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="Выход" />
        </ListItem>
      </List>
    </AppLayout>
  );
};

ProfileBase.propTypes = {
  userInfo: PropTypes.object,
  isPremium: PropTypes.bool,
};

ProfileBase.defaultProps = {
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

export const Profile = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileBase);
