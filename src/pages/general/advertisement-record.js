import React, { useState } from 'react';
import styled from 'styled-components';

import { LocationOn } from '@material-ui/icons';
import {
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  ListItemSecondaryAction,
} from '@material-ui/core';

import { AppLayout } from '../../layouts/App';
import { ButtonAction } from '../../components/elements/button-action';
import { PhotoContainer } from '../../components/elements/photo-container';
import { CardItem } from '../../components/elements/card-item';

const Header = styled.div`
  margin-left: 20px;
  margin-right: 20px;
`;

const Crown = styled.img`
  margin-left: 15px;
  margin-bottom: -5px;
`;

const images = [
  '/statics/sample01.jpg',
  '/statics/sample02.jpg',
  '/statics/sample01.jpg',
  '/statics/sample02.jpg',
  '/statics/sample01.jpg',
];

export const AdvertisementRecord = () => {
  const [isViewPhone, setViewPhone] = useState(false);

  return (
    <AppLayout>
      <PhotoContainer
        images={images}
        style={{ width: '225px', padding: '10px' }}
      />
      <Header>
        <Typography variant="h6">
          Маша, 21 год
          <Crown src="/statics/icons/crown.svg" alt="" />
        </Typography>
        <CardItem icon={LocationOn} label="Москва, Россия" />
        <Typography variant="body1">
          Меня в первую очередь интересует многое, но больше всего индивидуальность...
        </Typography>
      </Header>
      <List>
        <ListItem>
          <ListItemText
            primary="Телефон"
            secondary={
              isViewPhone ? '+7 (905)-256-56-56' : '+7 (905)-***_**_**'
            }
          />
          {!isViewPhone && (
            <ListItemSecondaryAction>
              <Button size="small" onClick={() => setViewPhone(true)}>
                показать
              </Button>
            </ListItemSecondaryAction>
          )}
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText
            primary="Объявление опубликовано:"
            secondary="25.06.2019"
          />
        </ListItem>
        <Divider />
      </List>
      <ButtonAction label="Написать Дарье" color="primary" variant="outlined" />
    </AppLayout>
  );
};
