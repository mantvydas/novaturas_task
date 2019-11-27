import produce from 'immer';
import {
  GET_COUNTRIES, GET_COUNTRIES_SUCCESS,
  HANDLE_CONFIRM_OPEN, HANDLE_CONFIRM_CLOSE
} from './constants';

export const initialState = {
  countries: [],
  loadingCountries: true,
  openConfirm: false,
  confirm_item_id: false,
};

const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {

      case GET_COUNTRIES:
        draft.loadingCountries = true;
        break;

      case GET_COUNTRIES_SUCCESS:
        draft.countries = action.countries.data;
        draft.loadingCountries = false;
        break;

      case HANDLE_CONFIRM_OPEN:
        draft.openConfirm = true;
        draft.confirm_item_id = action.id;
        break;

      case HANDLE_CONFIRM_CLOSE:
        draft.openConfirm = false;
        draft.confirm_item_id = false;
        break;
  }
  });

export default appReducer;
