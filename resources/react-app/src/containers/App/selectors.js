/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectApp = state => state.global || initialState;

const makeSelectCountries = () =>
  createSelector(
    selectApp,
    appState => appState.countries,
  );

const makeSelectCountriesLoading = () =>
  createSelector(
    selectApp,
    appState => appState.loadingCountries,
  );

const makeSelectOpenConfirm = () =>
  createSelector(
    selectApp,
    appState => appState.openConfirm,
  );

const makeSelectConfirmItemId = () =>
  createSelector(
    selectApp,
    appState => appState.confirm_item_id,
  );

export {
  selectApp,
  makeSelectCountries,
  makeSelectCountriesLoading,
  makeSelectOpenConfirm,
  makeSelectConfirmItemId
};
