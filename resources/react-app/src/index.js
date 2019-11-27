/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

// Needed for redux-saga es6 generator support
import '@babel/polyfill';

// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Switch, Route } from 'react-router-dom';
import FontFaceObserver from 'fontfaceobserver';
import history from './utils/history';
import 'sanitize.css/sanitize.css';
import * as serviceWorker from './serviceWorker';

// Import root app
import App from './containers/App';

// Load the favicon and the .htaccess file
// eslint-disable-next-line import/no-webpack-loader-syntax
import '!file-loader?name=[name].[ext]!./images/favicon.ico';
// eslint-disable-next-line import/no-webpack-loader-syntax
import 'file-loader?name=.htaccess!./.htaccess'; // eslint-disable-line import/extensions

import configureStore from './configureStore';
import { CookiesProvider } from 'react-cookie';

// Create redux store with history
const initialState = {};
const store = configureStore(initialState, history);
const MOUNT_NODE = document.getElementById('root');

const render = messages => {
  ReactDOM.render(
    <CookiesProvider>
      <Provider store={store}>
        <ConnectedRouter history={history}>
             <Route component={App} />
        </ConnectedRouter>
      </Provider>
    </CookiesProvider>,
    MOUNT_NODE,
  );
};

render();

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install(); // eslint-disable-line global-require
}

serviceWorker.unregister();
