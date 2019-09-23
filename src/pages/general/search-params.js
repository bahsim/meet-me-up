import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { AppLayout } from '../../layouts/App';
import { PageContent } from '../../layouts/PageContent';
import { SearchParamsForm } from '../../components/forms/SearchParamsForm';
import { HeaderBig } from '../../components/elements/header-big';
import { ButtonAction } from '../../components/elements/button-action';

const SearchParamsBase = ({ history }) => {
  const handleRequestOnSubmit = () => {
    history.goBack();
  };

  return (
    <AppLayout>
      <HeaderBig value="Поиск" />
      <PageContent>
        <SearchParamsForm mainAction={handleRequestOnSubmit}>
          <ButtonAction
            label="Найти!"
            type="submit"
            color="primary"
            variant="contained"
          />
        </SearchParamsForm>
      </PageContent>
    </AppLayout>
  );
};

SearchParamsBase.propTypes = {
  history: PropTypes.object.isRequired,
};

const mapDispatchToProps = dispatch => ({
  send: () => dispatch({ type: '' }),
});

export const SearchParams = withRouter(
  connect(
    null,
    mapDispatchToProps,
  )(SearchParamsBase),
);
