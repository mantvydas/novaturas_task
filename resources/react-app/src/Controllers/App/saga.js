import { call, put, select, takeLatest, all } from 'redux-saga/effects';
import {
  GET_COUNTRIES,
} from './constants';

import {
  getCountriesSuccess,
} from './actions';

import request from 'utils/request';

export function* getCountries() {

  const fetchData = {
      url: 'api/countries',
      method: 'GET',
    };

  try {
    const countries = yield call(request, fetchData);

    yield put(getCountriesSuccess(countries));

  } catch (err) {
    console.log(err.message);
  }
}

export default function* mainSaga() {
  yield all([
        takeLatest(GET_COUNTRIES, getCountries),
      ]);
}
