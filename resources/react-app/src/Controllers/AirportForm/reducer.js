import produce from 'immer';
import {
  HANDLE_OPEN, HANDLE_CLOSE,
  GET_AIRPORTS, GET_AIRPORTS_SUCCESS,
  STORE_AIRPORT, STORE_AIRPORT_SUCCESS, STORE_AIRPORT_ERROR,
  DELETE_AIRPORT
} from './constants';

export const initialState = {
  airport: false,
  open: false,
  airports: [],
  loadingAirports: true,
  selectedAirlines: [],
  airportToAction: false,
  setErrors: false,
  setStatus: false,
};

const airportFormReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {

      case HANDLE_OPEN:
        draft.open = true;
        draft.airport = action.airport;
        if(draft.airport && draft.airport.airlines.length > 0){
          const newAirlines = draft.airport.airlines.map(({id, name}) => { return id+'|'+name });
          draft.selectedAirlines = newAirlines;
        }
        break;

      case HANDLE_CLOSE:
        draft.open = false;
        draft.airport = false;
        draft.selectedAirlines = [];
        break;

      case GET_AIRPORTS:
        draft.loadingAirports = true;
        break;

      case GET_AIRPORTS_SUCCESS:
        draft.airports = action.airports.data;
        draft.loadingAirports = false;
        break;

      case STORE_AIRPORT:
        draft.airportToAction = action.values;
        console.log(draft.airportToAction);
        let ids = []
        if(draft.airportToAction.airlines && draft.airportToAction.airlines.length > 0){
          ids = draft.airportToAction.airlines.map(airline => parseInt(airline.split('|')[0]));
        }
        draft.airportToAction.airline_ids = ids;
        if(typeof draft.airportToAction.coordinates.lat != 'number'){
          const latLng = draft.airportToAction.coordinates.toJSON();
          draft.airportToAction.latitude = latLng.lat;
          draft.airportToAction.longitude = latLng.lng;
        }
        draft.setErrors = action.setErrors;
        draft.setStatus = action.setStatus;
        break;

      case STORE_AIRPORT_SUCCESS:
        draft.loadingAirports = false;
        if(draft.airports && draft.airports.length > 0){
          const index = draft.airports.findIndex(x => x.id == action.airport.data.id);

          if(index > -1){
            draft.airports[index] = action.airport.data;
          }
          else{
            draft.airports.push(action.airport.data);
          }
        }
        draft.open = false;
        draft.airport = false;
        draft.selectedAirlines= [];
        break;

      case STORE_AIRPORT_ERROR:
        draft.error = action.error;
        draft.loadingAirports = false;

        if(draft.error.errors)
          draft.setErrors(draft.error.errors);

        draft.error.message = draft.error.status == 401 ? "Neteisingai įvesti duomenys" : draft.error.message;
        draft.setStatus({
            error: draft.error.message,
          });
        break;

      case DELETE_AIRPORT:
        if(draft.airports && draft.airports.length > 0){
          const index = draft.airports.findIndex(x => x.id == action.id);

          if(index > -1){
            draft.airports.splice(index, 1);
          }
        }
        draft.airportToAction = action.id;
        break;
  }
  });

export default airportFormReducer;
