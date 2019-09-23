import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';

import { AppLayout } from '../../layouts/App';
import { PageContent } from '../../layouts/PageContent';
import { PageContentInfo } from '../../layouts/PageContentInfo';
import { RegistrationProfileForm } from '../../components/forms/RegistrationProfileForm';
import { RegistrationMainForm } from '../../components/forms/RegistrationMainForm';
import { RegistrationEnd } from '../../components/registration-end';

import { HeaderBig } from '../../components/elements/header-big';
import { ButtonAction } from '../../components/elements/button-action';

import { routes } from '../../constants/routes';

const RegistrationFullBase = ({ userInfo, history }) => {
  const [step, setStep] = useState(1);

  const handleProfileFormOnSubmit = () => {
    setStep(2);
  };

  const handleMainFormOnSubmit = () => {
    setStep(3);
  };

  const handleEndFormOnSubmit = () => {
    history.goBack();
  };

  const styleProfileForm = step === 1 ? {} : { display: 'none' };
  const styleMainForm = step === 2 ? {} : { display: 'none' };
  const styleEndForm = step === 3 ? {} : { display: 'none' };

  if (userInfo) {
    return <Redirect to={routes.main} />;
  }

  return (
    <AppLayout>
      <HeaderBig value="Регистрация" />
      <div style={styleProfileForm}>
        <PageContent>
          <RegistrationProfileForm mainAction={handleProfileFormOnSubmit}>
            <ButtonAction
              label="Продолжить"
              type="submit"
              color="primary"
              variant="contained"
            />
          </RegistrationProfileForm>
        </PageContent>
      </div>
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

RegistrationFullBase.propTypes = {
  history: PropTypes.object.isRequired,
  userInfo: PropTypes.object,
};

RegistrationFullBase.defaultProps = {
  userInfo: null,
};

const mapStateToProps = ({ auth: { userInfo } }) => ({
  userInfo,
});

export const RegistrationFull = withRouter(
  connect(mapStateToProps)(RegistrationFullBase),
);
