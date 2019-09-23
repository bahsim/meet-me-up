import React from 'react';
import styled from 'styled-components';

import { LocationOn } from '@material-ui/icons';
import {
  Typography,
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

export const ProfileView = () => (
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
        Меня в первую очередь интересует многое,
        но больше всего индивидуальность...
      </Typography>
    </Header>
    <ButtonAction label="Написать Дарье" color="primary" variant="outlined" />
  </AppLayout>
);
