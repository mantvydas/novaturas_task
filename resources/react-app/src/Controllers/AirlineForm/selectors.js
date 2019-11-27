/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectAirlineForm = state => state.airlineForm || initialState;

const makeSelectAirline = () =>
  createSelector(
    selectAirlineForm,
    airlineFormState => airlineFormState.airline,
  );

const makeSelectAirlineToAction = () =>
  createSelector(
    selectAirlineForm,
    airlineFormState => airlineFormState.airlineToAction,
  );

const makeSelectOpen = () =>
  createSelector(
    selectAirlineForm,
    airlineFormState => airlineFormState.open,
  );

const makeSelectSelectedAirports = () =>
  createSelector(
    selectAirlineForm,
    airlineFormState => airlineFormState.selectedAirports,
  );

const makeSelectAirlines = () =>
  createSelector(
    selectAirlineForm,
    airlineFormState => airlineFormState.airlines,
  );

const makeSelectAirlinesLoading = () =>
  createSelector(
    selectAirlineForm,
    airlineFormState => airlineFormState.loadingAirlines,
  );

export {
  selectAirlineForm,
  makeSelectAirline,
  makeSelectOpen,
  makeSelectSelectedAirports,
  makeSelectAirlines,
  makeSelectAirlinesLoading,
  makeSelectAirlineToAction
};
