import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

import { AppLayout } from '../../layouts/App';
import { PageList } from '../../layouts/PageList';
import { PageContent } from '../../layouts/PageContent';
import { CardProfile } from '../../components/card-profile';
import { ButtonAction } from '../../components/elements/button-action';
import { HeaderBig } from '../../components/elements/header-big';

import { routes } from '../../constants/routes';

const data = [
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
  {
    title: 'Маша, 21 год',
    description:
      'Меня в первую очередь интересует многое, но больше всего индивидуальность...',
    image: '/statics/sample02.jpg',
    adress: 'Москва, Россия',
    isGold: true,
  },
];

const SearchBase = ({ history }) => {
  const handleCardClick = () => {
    history.push(routes.profileView);
  };

  return (
    <AppLayout>
      <PageList>
        <HeaderBig value="Поиск" />
        <PageContent>
          <ButtonAction
            label="Фильтры"
            color="primary"
            variant="outlined"
            component={Link}
            to={routes.searchParams}
          />
          {data.map((item, index) => (
            <CardProfile key={index} data={item} onClick={handleCardClick} />
          ))}
        </PageContent>
      </PageList>
    </AppLayout>
  );
};

SearchBase.propTypes = {
  history: PropTypes.object.isRequired,
};

const mapDispatchToProps = dispatch => ({
  send: () => dispatch({ type: '' }),
});

export const Search = withRouter(
  connect(
    null,
    mapDispatchToProps,
  )(SearchBase),
);
