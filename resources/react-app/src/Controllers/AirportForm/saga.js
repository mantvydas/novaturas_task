import { call, put, select, takeLatest, all } from 'redux-saga/effects';
import {
  GET_AIRPORTS,
  STORE_AIRPORT,
  DELETE_AIRPORT,
} from './constants';

import {
  getAirportsSuccess,
  storeAirportSuccess,
  storeAirportError
} from './actions';

import {
  getAirlines
} from 'containers/AirlineForm/actions';

import {
  makeSelectAirportToAction
} from './selectors';

import request from 'utils/request';

export function* getAirports() {

  const fetchData = {
      url: 'api/airports',
      method: 'GET',
    };

  try {
    const airports = yield call(request, fetchData);

    yield put(getAirportsSuccess(airports));

  } catch (err) {
    console.log(err.message);
  }
}

export function* storeAirport() {
  const data = yield select(makeSelectAirportToAction());
  const fetchData = {
      data: data,
      url: data.id ? 'api/airport/'+data.id : 'api/airport',
      method: data.id ? 'PUT' : 'POST',
    };

  try {
    const airport = yield call(request, fetchData);

    yield put(storeAirportSuccess(airport));
    yield put(getAirlines());

  } catch (err) {
    console.log(err.message);
    yield put(storeAirportError(err.response));
  }
}

export function* deleteAirport() {
  const id = yield select(makeSelectAirportToAction());
  const fetchData = {
      url: 'api/airport/'+id,
      method: 'DELETE',
    };

  try {
    yield call(request, fetchData);

  } catch (err) {
    console.log(err.message);
  }
}

export default function* airportsSaga() {
  yield all([
        takeLatest(GET_AIRPORTS, getAirports),
        takeLatest(STORE_AIRPORT, storeAirport),
        takeLatest(DELETE_AIRPORT, deleteAirport),
      ]);
}
