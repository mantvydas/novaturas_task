import {
  HANDLE_OPEN, HANDLE_CLOSE,
  STORE_AIRLINE, STORE_AIRLINE_SUCCESS, STORE_AIRLINE_ERROR,
  GET_AIRLINES, GET_AIRLINES_SUCCESS, DELETE_AIRLINE
} from './constants';

export function handleOpen(airline = false) {
  return {
    type: HANDLE_OPEN,
    airline,
  };
}

export function handleClose() {
  return {
    type: HANDLE_CLOSE,
  };
}

export function storeAirline(values, setErrors, setStatus) {
  return {
    type: STORE_AIRLINE,
    values,
    setErrors,
    setStatus
  };
}

export function storeAirlineSuccess(airline) {
  return {
    type: STORE_AIRLINE_SUCCESS,
    airline,
  };
}

export function storeAirlineError(error) {
  return {
    type: STORE_AIRLINE_ERROR,
    error,
  };
}

export function getAirlines() {
  return {
    type: GET_AIRLINES,
  };
}

export function getAirlinesSuccess(airlines) {
  return {
    type: GET_AIRLINES_SUCCESS,
    airlines,
  };
}

export function deleteAirline(id) {
  return {
    type: DELETE_AIRLINE,
    id
  };
}
