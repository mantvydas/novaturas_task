import React, { useEffect, memo, useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { useFormik } from 'formik';
import injectSaga from 'utils/injectSaga';

import {
  handleClose,
  storeAirport
} from './actions';

import {
  makeSelectAirport,
  makeSelectOpen,
  makeSelectSelectedAirlines,
  makeSelectAirports
} from './selectors';

import {
  makeSelectCountries,
} from 'containers/App/selectors';

import {
  makeSelectAirlines,
} from 'containers/AirlineForm/selectors';

import { InfoWindow, withGoogleMap, withScriptjs, GoogleMap, Marker } from 'react-google-maps';
import { withStateHandlers } from "recompose";

import { useTheme, makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  nameField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 400,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const Map = compose(
    withScriptjs,
    withGoogleMap
)
    (props =>
        <GoogleMap
            defaultZoom={8}
            defaultCenter={props.markerPosition}
            onClick={(e)=>{props.clickMap(e.latLng)}}
        >
            {props.markerPosition && <Marker position={props.markerPosition} />}

        </GoogleMap>
    )

function AirportForm({
  handleClose,
  open,
  airport,
  airlines,
  selectedAirlines,
  countries,
  storeAirport
})
{
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  function getStyles(airline, selectedAirlines, theme) {
    return {
      fontWeight:
        selectedAirlines.indexOf(airline) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  const validate = values => {
    const errors = {};
    if (!values.name) {
      errors.name = 'Required';
    } else if (values.name.length < 5) {
      errors.name = 'Must be 6 characters or more';
    }

    if (!values.country_id) {
      errors.country_id = 'Required';
    }

    return errors;
  };

  console.log(airport);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: airport && airport.id || '',
      name: airport && airport.name || '',
      country_id: airport && airport.country.id || '',
      coordinates: { lat: airport && airport.latitude ? airport.latitude : 54.89771789305085, lng: airport && airport.longitude ? airport.longitude : 23.886624267538878},
      airlines: airport && selectedAirlines || [],
      all_airlines: airlines.map(({id, name}) => { return id+'|'+name })
    },
    validate,
    onSubmit: (values, {setStatus, setErrors}) => {
      console.log('veikia');
      storeAirport(values,setErrors,setStatus);
    },
  });

  return (
    <Dialog fullScreen={fullScreen} fullWidth maxWidth='md' open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{airport ? 'Edit airport' : 'Create airport'}</DialogTitle>
        <DialogContent>
        <form>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                error={formik.errors && formik.errors.name}
                helperText={formik.errors && formik.errors.name}
                autoFocus
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                name="name"
                id="name"
                label="Name"
                type="text"
                className={classes.nameField}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl>
                <InputLabel className={classes.textField} htmlFor="country_id">Country</InputLabel>
                <Select
                  required
                  error={formik.errors && formik.errors.country_id}
                  helperText={formik.errors && formik.errors.country_id}
                  onChange={e => {
                     formik.setFieldValue('country_id', e.target.value);
                  }}
                  onBlur={formik.handleBlur}
                  value={formik.values.country_id}
                  name="country_id"
                  className={classes.textField}
                  native
                  inputProps={{
                    name: 'Country',
                    id: 'country_id',
                  }}
                >
                  <option value="" />
                  {countries.map(country => (
                    <option key={country.name} value={country.id}>{country.name}</option>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl className={classes.formControl}>
                <InputLabel className={classes.textField} id="airlines">Airlines</InputLabel>
                <Select
                  labelId="airlines-label"
                  id="airlines"
                  multiple
                  name="airlines"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.airlines}
                  input={<Input id="select-airlines" />}
                  className={classes.textField}
                  renderValue={selected => (
                    <div className={classes.chips}>
                      {selected.map(value => (
                        <Chip key={value} label={value.split("|")[1]} className={classes.chip} />
                      ))}
                    </div>
                  )}
                  MenuProps={MenuProps}
                >
                  {formik.values.all_airlines.map(airline => (
                    <MenuItem selected key={airline} value={airline} style={getStyles(airline, formik.values.airlines, theme)}>
                      {airline.split("|")[1]}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="coordinates"
                name="coordinates"
                label="Coordinates"
                className={classes.textField}
                margin="normal"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={typeof formik.values.coordinates.lat == 'number' ? '('+formik.values.coordinates.lat+', '+formik.values.coordinates.lng+')' : formik.values.coordinates}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
          </Grid>
          <Map
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyABC-cILOpc0umd5ETtbZLXZ0UcjkjbK1Q"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `400px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                    clickMap={value => {
                       formik.setFieldValue('coordinates', value);
                    }}
                    markerPosition={formik.values.coordinates}
                />
        </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={formik.handleSubmit} color="primary">
            {airport ? 'Edit' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
  );
}

AirportForm.propTypes = {
  handleClose : PropTypes.func,
  open: PropTypes.bool,
  airport: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object
  ]),
  airlines: PropTypes.array,
  selectedAirlines: PropTypes.array,
  countries: PropTypes.array,
  storeAirport: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  airport: makeSelectAirport(),
  open: makeSelectOpen(),
  airlines: makeSelectAirlines(),
  selectedAirlines: makeSelectSelectedAirlines(),
  countries: makeSelectCountries()
});

export function mapDispatchToProps(dispatch) {
  return {
    handleClose: () => {
      dispatch(handleClose());
    },
    storeAirport: (values,setErrors,setStatus) => {
      dispatch(storeAirport(values,setErrors,setStatus));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(AirportForm);
