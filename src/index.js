import 'babel-polyfill';
import * as OfflinePluginRuntime from 'offline-plugin/runtime';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

import { makeStore } from './modules/store';
import materialUiTheme from './theme/config';

import { GlobalStyle } from './theme/global';

import { Routes } from './router';
import { Startup } from './components/start-up';

OfflinePluginRuntime.install();

const store = makeStore();

ReactDOM.render(
  <Provider store={store}>
    <MuiPickersUtilsProvider utils={MomentUtils} locale="ru">
      <MuiThemeProvider theme={materialUiTheme}>
        <Startup>
          <Routes />
        </Startup>
        <GlobalStyle />
      </MuiThemeProvider>
    </MuiPickersUtilsProvider>
  </Provider>,
  document.getElementById('app'),
);
