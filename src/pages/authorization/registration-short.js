import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';

import { AppLayout } from '../../layouts/App';
import { PageContent } from '../../layouts/PageContent';
import { PageContentInfo } from '../../layouts/PageContentInfo';
import { RegistrationMainForm } from '../../components/forms/RegistrationMainForm';
import { RegistrationEnd } from '../../components/registration-end';

import { HeaderBig } from '../../components/elements/header-big';
import { ButtonAction } from '../../components/elements/button-action';

import { routes } from '../../constants/routes';

const RegistrationShortBase = ({ userInfo, history }) => {
  const [step, setStep] = useState(1);

  const handleMainFormOnSubmit = () => {
    setStep(2);
  };

  const handleEndFormOnSubmit = () => {
    history.goBack();
  };

  const styleMainForm = step === 1 ? {} : { display: 'none' };
  const styleEndForm = step === 2 ? {} : { display: 'none' };

  if (userInfo) {
    return <Redirect to={routes.main} />;
  }

  return (
    <AppLayout>
      <HeaderBig value="Регистрация" />
      <div style={styleMainForm}>
        <PageContent>
          <RegistrationMainForm mainAction={handleMainFormOnSubmit}>
            <ButtonAction
              label="Загеристрироваться"
              type="submit"
              color="primary"
              variant="contained"
            />
          </RegistrationMainForm>
        </PageContent>
      </div>
      <div style={styleEndForm}>
        <PageContentInfo>
          <RegistrationEnd>
            <ButtonAction
              label="Продолжить"
              color="primary"
              variant="contained"
              onClick={handleEndFormOnSubmit}
            />
          </RegistrationEnd>
        </PageContentInfo>
      </div>
    </AppLayout>
  );
};

RegistrationShortBase.propTypes = {
  history: PropTypes.object.isRequired,
  userInfo: PropTypes.object,
};

RegistrationShortBase.defaultProps = {
  userInfo: null,
};

const mapStateToProps = ({ auth: { userInfo } }) => ({
  userInfo,
});

export const RegistrationShort = withRouter(
  connect(mapStateToProps)(RegistrationShortBase),
);
