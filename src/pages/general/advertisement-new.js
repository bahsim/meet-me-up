import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { LocationOn } from '@material-ui/icons';
import { Typography } from '@material-ui/core';

import { AppLayout } from '../../layouts/App';
import { PageContent } from '../../layouts/PageContent';
import { HeaderBig } from '../../components/elements/header-big';
import { AdvertisementNewForm } from '../../components/forms/AdvertisementNewForm';
import { PhotoContainer } from '../../components/elements/photo-container';
import { CardItem } from '../../components/elements/card-item';
import { ButtonAction } from '../../components/elements/button-action';

const Head = styled.div`
  margin-left: 20px;
  margin-right: 20px;
  margin-bottom: 15px;
`;

const images = [
  '/statics/sample01.jpg',
  '/statics/sample02.jpg',
  '/statics/sample01.jpg',
  '/statics/sample02.jpg',
  '/statics/sample01.jpg',
];

export const AdvertisementNewBase = ({ history, userInfo }) => {
  const handleFormOnSubmit = () => {
    history.goBack();
  };

  return (
    <AppLayout>
      <HeaderBig value="Добавить объявление" />
      <PhotoContainer
        isMine
        images={images}
        style={{ width: '225px', padding: '10px' }}
      />
      <Head>
        <Typography variant="h6">Маша, 21 год</Typography>
        <CardItem icon={LocationOn} label="Москва, Россия" />
        <Typography variant="body1">
          Меня в первую очередь интересует многое, но больше всего индивидуальность...
        </Typography>
      </Head>
      <PageContent>
        <AdvertisementNewForm mainAction={handleFormOnSubmit}>
          {userInfo && (
            <ButtonAction
              label="Добавить объявление"
              type="submit"
              color="primary"
              variant="contained"
            />
          )}
        </AdvertisementNewForm>
      </PageContent>
    </AppLayout>
  );
};

AdvertisementNewBase.propTypes = {
  history: PropTypes.object.isRequired,
  userInfo: PropTypes.object,
};

AdvertisementNewBase.defaultProps = {
  userInfo: null,
};

const mapStateToProps = ({ auth: { userInfo } }) => ({
  userInfo,
});

export const AdvertisementNew = withRouter(
  connect(mapStateToProps)(AdvertisementNewBase),
);
