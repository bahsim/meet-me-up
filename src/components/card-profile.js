import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from '@material-ui/core';

import { LocationOn } from '@material-ui/icons';

import { Image } from './elements/Image';
import { CardItem } from './elements/card-item';

const Crown = styled.img`
  margin-left: 15px;
  margin-bottom: -5px;
`;

export const CardProfile = ({ data, onClick }) => (
  <>
    <Card onClick={onClick}>
      <CardActionArea>
        <Image src={data.image} width="100%" />
        <CardContent>
          <Typography variant="h6">
            {data.title}
            {data.isGold
              && <Crown src="/statics/icons/crown.svg" alt="" />}
          </Typography>
          <CardItem icon={LocationOn} label={data.adress} />
          <Typography variant="body2" color="textSecondary" component="p">
            {data.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    <br />
  </>
);

CardProfile.propTypes = {
  data: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};
