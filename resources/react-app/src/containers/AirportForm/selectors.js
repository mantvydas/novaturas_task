/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectAirportForm = state => state.airportForm || initialState;

const makeSelectAirport = () =>
  createSelector(
    selectAirportForm,
    airportFormState => airportFormState.airport,
  );

const makeSelectOpen = () =>
  createSelector(
    selectAirportForm,
    airportFormState => airportFormState.open,
  );

const makeSelectSelectedAirlines = () =>
  createSelector(
    selectAirportForm,
    airportFormState => airportFormState.selectedAirlines,
  );

const makeSelectAirportToAction = () =>
  createSelector(
    selectAirportForm,
    airportFormState => airportFormState.airportToAction,
  );

const makeSelectAirports = () =>
  createSelector(
    selectAirportForm,
    airportFormState => airportFormState.airports,
  );

const makeSelectAirportsLoading = () =>
  createSelector(
    selectAirportForm,
    airportFormState => airportFormState.loadingAirports,
  );

export {
  selectAirportForm,
  makeSelectAirport,
  makeSelectOpen,
  makeSelectAirportToAction,
  makeSelectSelectedAirlines,
  makeSelectAirports,
  makeSelectAirportsLoading
};
