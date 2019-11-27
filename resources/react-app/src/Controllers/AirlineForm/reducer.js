import produce from 'immer';
import {
  HANDLE_OPEN, HANDLE_CLOSE,
  STORE_AIRLINE, STORE_AIRLINE_SUCCESS, STORE_AIRLINE_ERROR,
  GET_AIRLINES, GET_AIRLINES_SUCCESS, DELETE_AIRLINE
} from './constants';

export const initialState = {
  airline: false,
  airlineToAction: false,
  open: false,
  selectedAirports: [],
  airlines: [],
  loadingAirlines: true,
  setErrors: false,
  setStatus: false,
};

const airlineFormReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {

      case HANDLE_OPEN:
        draft.open = true;
        draft.airline = action.airline;
        if(draft.airline && draft.airline.airports.length > 0){
          const newAirports = draft.airline.airports.map(({id, name}) => { return id+'|'+name });
          draft.selectedAirports = newAirports;
        }
        break;

      case HANDLE_CLOSE:
        draft.open = false;
        draft.airline = false;
        draft.selectedAirports = [];
        break;

      case GET_AIRLINES:
        draft.loadingAirlines = true;
        break;

      case GET_AIRLINES_SUCCESS:
        draft.airlines = action.airlines.data;
        draft.loadingAirlines = false;
        break;

      case STORE_AIRLINE:
        draft.airlineToAction = action.values;
        let ids = []
        console.log(action.values);
        if(draft.airlineToAction.airports && draft.airlineToAction.airports.length > 0){
          ids = draft.airlineToAction.airports.map(airport => parseInt(airport.split('|')[0]));
        }
        draft.airlineToAction.airport_ids = ids;
        draft.setErrors = action.setErrors;
        draft.setStatus = action.setStatus;
        break;

      case STORE_AIRLINE_SUCCESS:
        draft.loadingAirlines = false;
        if(draft.airlines && draft.airlines.length > 0){
          const index = draft.airlines.findIndex(x => x.id == action.airline.data.id);

          if(index > -1){
            draft.airlines[index] = action.airline.data;
          }
          else{
            draft.airlines.push(action.airline.data);
          }
        }
        draft.open = false;
        draft.airline = false;
        draft.selectedAirports = [];
        break;

      case STORE_AIRLINE_ERROR:
        draft.error = action.error;
        draft.loadingAirlines = false;

        if(draft.error.errors)
          draft.setErrors(draft.error.errors);

        draft.error.message = draft.error.status == 401 ? "Neteisingai įvesti duomenys" : draft.error.message;
        draft.setStatus({
            error: draft.error.message,
          });
        break;

      case DELETE_AIRLINE:
        if(draft.airlines && draft.airlines.length > 0){
          const index = draft.airlines.findIndex(x => x.id == action.id);

          if(index > -1){
            draft.airlines.splice(index, 1);
          }
        }
        draft.airlineToAction = action.id;
        break;
  }
  });

export default airlineFormReducer;
