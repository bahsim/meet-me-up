import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Main } from '../pages/main';

import { Authorization } from '../pages/authorization/authorization';
import { RecoveryPassword } from '../pages/authorization/recovery-password';
import { RegistrationFull } from '../pages/authorization/registration-full';
import { RegistrationShort } from '../pages/authorization/registration-short';

import { Profile } from '../pages/profile/profile';
import { ProfileSettings } from '../pages/profile/profile-settings';
import { ChangeEmail } from '../pages/profile/change-email';
import { ChangePassword } from '../pages/profile/change-password';
import { ProfilePremium } from '../pages/profile/profile-premium';
import { Premium } from '../pages/profile/premium';
import { PersonalDialogs } from '../pages/profile/personal-dialogs';

import { Search } from '../pages/general/search';
import { SearchParams } from '../pages/general/search-params';
import { ProfileView } from '../pages/general/profile-view';

import { AdvertisementList } from '../pages/general/advertisement-list';
import { AdvertisementRecord } from '../pages/general/advertisement-record';
import { AdvertisementNew } from '../pages/general/advertisement-new';

import { ChatGeneral } from '../pages/general/chat-general';

import { routes } from '../constants/routes';

export const Routes = () => (
  <Router>
    <Switch>
      <Route path={routes.main} exact component={Main} />

      <Route path={routes.profile} exact component={Profile} />
      <Route path={routes.settings} exact component={ProfileSettings} />
      <Route path={routes.changeEmail} exact component={ChangeEmail} />
      <Route path={routes.changePassword} exact component={ChangePassword} />
      <Route path={routes.profilePremium} exact component={ProfilePremium} />
      <Route path={routes.personaDialogs} exact component={PersonalDialogs} />
      <Route path={routes.premium} exact component={Premium} />

      <Route path={routes.search} exact component={Search} />
      <Route path={routes.searchParams} exact component={SearchParams} />
      <Route path={routes.profileView} exact component={ProfileView} />

      <Route path={routes.adsView} exact component={AdvertisementRecord} />
      <Route path={routes.adsNew} exact component={AdvertisementNew} />

      <Route path={routes.login} exact component={Authorization} />
      <Route path={routes.recovery} exact component={RecoveryPassword} />
      <Route path={routes.reg} exact component={RegistrationFull} />
      <Route path={routes.regShort} exact component={RegistrationShort} />

      <Route path={routes.chat} exact component={ChatGeneral} />
      <Route path={routes.ads} exact component={AdvertisementList} />

    </Switch>
  </Router>
);
