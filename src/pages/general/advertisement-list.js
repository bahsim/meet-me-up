import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { Typography } from '@material-ui/core';

import { CentralLayout } from '../../layouts/Central';
import { PageList } from '../../layouts/PageList';
import { PageContent } from '../../layouts/PageContent';
import { CardProfile } from '../../components/card-profile';
import { ButtonAction } from '../../components/elements/button-action';
import { HeaderCentralBase } from '../../components/elements/header-cetral';
import { DenyAuthDialog } from '../../components/dialogs/DenyAuthDialog';

import { routes } from '../../constants/routes';

const data = [
  {
    title: 'Маша, 21 год',
    description:
      'Меня в первую очередь интересует многое, но больше всего индивидуальность...',
    image: '/statics/sample01.jpg',
    adress: 'Москва, Россия',
    isGold: false,
  },
  {
    title: 'Маша, 21 год',
    description:
      'Меня в первую очередь интересует многое, но больше всего индивидуальность...',
    image: '/statics/sample02.jpg',
    adress: 'Москва, Россия',
    isGold: true,
  },
  {
    title: 'Маша, 21 год',
    description:
      'Меня в первую очередь интересует многое, но больше всего индивидуальность...',
    image: '/statics/sample01.jpg',
    adress: 'Москва, Россия',
    isGold: false,
  },
];

const AdvertisementListBase = ({ history, userInfo }) => {
  const [isAuthDialogOpen, setAuthDialog] = useState(false);

  const handleCardClick = () => {
    history.push(routes.adsView);
  };

  const handleAddNew = () => {
    if (!userInfo) {
      setAuthDialog(true);
    } else {
      history.push(routes.adsNew);
    }
  };

  return (
    <CentralLayout>
      <PageList>
        <HeaderCentralBase value="Объявления" step={2} total={3} />
        <PageContent>
          <ButtonAction
            label="Добавить объявление"
            color="primary"
            containerStyle={{ margin: 0 }}
            onClick={() => handleAddNew()}
          />
          <Typography variant="body1" paragraph={false}>
            Сортировать по:
          </Typography>
          <ButtonAction label="Дата" color="primary" variant="outlined" />
          {data.map((item, index) => (
            <CardProfile key={index} data={item} onClick={handleCardClick} />
          ))}
        </PageContent>
        <DenyAuthDialog
          isOpened={isAuthDialogOpen}
          onClose={() => setAuthDialog(false)}
          title="Чтобы добавить новое объявление"
        />
      </PageList>
    </CentralLayout>
  );
};

AdvertisementListBase.propTypes = {
  history: PropTypes.object.isRequired,
  userInfo: PropTypes.object,
};

AdvertisementListBase.defaultProps = {
  userInfo: null,
};

const mapStateToProps = ({ auth: { userInfo } }) => ({
  userInfo,
});

const mapDispatchToProps = dispatch => ({
  send: () => dispatch({ type: '' }),
});

export const AdvertisementList = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(AdvertisementListBase),
);
