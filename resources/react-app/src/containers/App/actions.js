import {
  GET_COUNTRIES, GET_COUNTRIES_SUCCESS,
  HANDLE_CONFIRM_OPEN, HANDLE_CONFIRM_CLOSE
} from './constants';

export function getCountries() {
  return {
    type: GET_COUNTRIES,
  };
}

export function getCountriesSuccess(countries) {
  return {
    type: GET_COUNTRIES_SUCCESS,
    countries,
  };
}

export function handleConfirmOpen(id) {
  return {
    type: HANDLE_CONFIRM_OPEN,
    id,
  };
}

export function handleConfirmClose() {
  return {
    type: HANDLE_CONFIRM_CLOSE,
  };
}
