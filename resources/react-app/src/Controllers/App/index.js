/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

 import React, { useEffect, memo } from 'react';
 import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { push } from 'connected-react-router'
import injectSaga from 'utils/injectSaga';

import appSaga from './saga';
import airlinesSaga from 'containers/AirlineForm/saga';
import airportsSaga from 'containers/AirportForm/saga';

import {
  getCountries,
} from './actions';

import {
  getAirports,
} from 'containers/AirportForm/actions';

import {
  getAirlines,
} from 'containers/AirlineForm/actions';

import GlobalStyle from '../../global-styles';
import Header from 'components/Header';
import AirportsPage from 'containers/AirportsPage';
import AirlinesPage from 'containers/AirlinesPage';

import CssBaseline from '@material-ui/core/CssBaseline';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';

const AppWrapper = styled.div`
  margin: 0 auto;
  display: flex;
`;

const useStyles = makeStyles(theme => ({
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export function App({ goTo, getAirlines, getAirports, getCountries }) {
  const classes = useStyles();

  useEffect(() => {
    getAirlines();
    getAirports();
    getCountries();
    }, []);

  return (
    <AppWrapper>
      <Helmet
        titleTemplate="%s - Novaturo užduotis - Mantvydas Šarkus"
        defaultTitle="Novaturo užduotis - Mantvydas Šarkus"
      >
        <meta name="description" content="Novaturo paskirta užduotis atrankai į PHP programuotojo poziciją. Atliko Mantvydas Šarkus." />
      </Helmet>
      <CssBaseline />
      <Header goTo={goTo}/>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Switch>
          <Route exact path={`/airlines`} component={AirlinesPage} />
          <Route exact path={`/`} component={AirportsPage} />
        </Switch>
      </main>

      <GlobalStyle />
    </AppWrapper>
  );
}

App.propTypes = {
  goTo: PropTypes.func,
  getAirlines: PropTypes.func,
  getAirports: PropTypes.func,
  getCountries: PropTypes.func
};

const mapStateToProps = createStructuredSelector({
});

export function mapDispatchToProps(dispatch) {
  return {
    goTo: (link) => {
      dispatch(push(link));
    },
    getAirlines: () => {
      dispatch(getAirlines());
    },
    getAirports: () => {
      dispatch(getAirports());
    },
    getCountries: () => {
      dispatch(getCountries());
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  injectSaga({ key: 'appSaga', saga: appSaga }),
  injectSaga({ key: 'airportsSaga', saga: airportsSaga }),
  injectSaga({ key: 'airlinesSaga', saga: airlinesSaga }),
  withConnect,
  memo,
)(App);
