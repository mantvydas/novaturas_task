import {
  HANDLE_OPEN, HANDLE_CLOSE,
  GET_AIRPORTS, GET_AIRPORTS_SUCCESS,
  STORE_AIRPORT, STORE_AIRPORT_SUCCESS, STORE_AIRPORT_ERROR,
  DELETE_AIRPORT
} from './constants';

export function handleOpen(airport = false) {
  return {
    type: HANDLE_OPEN,
    airport,
  };
}

export function handleClose() {
  return {
    type: HANDLE_CLOSE,
  };
}

export function getAirports() {
  return {
    type: GET_AIRPORTS,
  };
}

export function getAirportsSuccess(airports) {
  return {
    type: GET_AIRPORTS_SUCCESS,
    airports,
  };
}

export function storeAirport(values, setErrors, setStatus) {
  return {
    type: STORE_AIRPORT,
    values,
    setErrors,
    setStatus
  };
}

export function storeAirportSuccess(airport) {
  return {
    type: STORE_AIRPORT_SUCCESS,
    airport,
  };
}

export function storeAirportError(error) {
  return {
    type: STORE_AIRPORT_ERROR,
    error,
  };
}

export function deleteAirport(id) {
  return {
    type: DELETE_AIRPORT,
    id,
  };
}
