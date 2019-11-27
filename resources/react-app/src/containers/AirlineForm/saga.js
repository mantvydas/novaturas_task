import { call, put, select, takeLatest, all } from 'redux-saga/effects';
import {
  GET_AIRLINES,
  STORE_AIRLINE,
  DELETE_AIRLINE,
} from './constants';

import {
  getAirlinesSuccess,
  storeAirlineSuccess,
  storeAirlineError
} from './actions';

import {
  getAirports
} from 'containers/AirportForm/actions';

import {
  makeSelectAirlineToAction
} from './selectors';

import request from 'utils/request';

export function* getAirlines() {

  const fetchData = {
      url: 'api/airlines',
      method: 'GET',
    };

  try {
    const airlines = yield call(request, fetchData);

    yield put(getAirlinesSuccess(airlines));

  } catch (err) {
    console.log(err.message);
  }
}

export function* storeAirline() {
  const data = yield select(makeSelectAirlineToAction());
  const fetchData = {
      data: data,
      url: data.id ? 'api/airline/'+data.id : 'api/airline',
      method: data.id ? 'PUT' : 'POST',
    };

  try {
    const airline = yield call(request, fetchData);

    yield put(storeAirlineSuccess(airline));
    yield put(getAirports());

  } catch (err) {
    console.log(err.message);
    yield put(storeAirlineError(err.response));
  }
}

export function* deleteAirline() {
  const id = yield select(makeSelectAirlineToAction());
  const fetchData = {
      url: 'api/airline/'+id,
      method: 'DELETE',
    };

  try {
    yield call(request, fetchData);

  } catch (err) {
    console.log(err.message);
  }
}

export default function* airlinesSaga() {
  yield all([
        takeLatest(GET_AIRLINES, getAirlines),
        takeLatest(STORE_AIRLINE, storeAirline),
        takeLatest(DELETE_AIRLINE, deleteAirline),
      ]);
}
