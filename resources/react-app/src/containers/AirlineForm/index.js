import React, { useEffect, memo, useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { useFormik } from 'formik';
import injectSaga from 'utils/injectSaga';
import saga from './saga';

import {
  handleClose,
  storeAirline
} from './actions';

import {
  makeSelectAirline,
  makeSelectOpen,
  makeSelectMarkerPosition,
  makeSelectSelectedAirports,
  makeSelectAirlines
} from './selectors';

import {
  makeSelectCountries,
} from 'containers/App/selectors';

import {
  makeSelectAirports,
} from 'containers/AirportForm/selectors';

import { useTheme, makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
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

function AirlineForm({
  handleClose,
  open,
  airline,
  airports,
  selectedAirports,
  countries,
  storeAirline
})
{
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  function getStyles(airport, selectedAirports, theme) {
    return {
      fontWeight:
        selectedAirports.indexOf(airport) === -1
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

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: airline && airline.id || '',
      name: airline && airline.name || '',
      country_id: airline && airline.country.id || '',
      airports: airline && selectedAirports || [],
      all_airports: airports.map(({id, name}) => { return id+'|'+name })
    },
    validate,
    onSubmit: (values, {setStatus, setErrors}) => {
      storeAirline(values,setErrors,setStatus);
    },
  });

  return (
    <Dialog fullScreen={fullScreen} fullWidth maxWidth='md' open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{airline ? 'Edit airline' : 'Create airline'}</DialogTitle>
        <DialogContent>
          <form>
            <Grid container spacing={1}>
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
                  <InputLabel className={classes.textField} id="airports">Airports</InputLabel>
                  <Select
                    labelId="airports-label"
                    id="airports"
                    multiple
                    name="airports"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.airports}
                    input={<Input id="select-airports" />}
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
                    {formik.values.all_airports.map(airport => (
                      <MenuItem selected key={airport} value={airport} style={getStyles(airport, formik.values.airports, theme)}>
                        {airport.split("|")[1]}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={formik.handleSubmit} color="primary">
            {airline ? 'Edit' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
  );
}

AirlineForm.propTypes = {
  airports : PropTypes.array,
  handleClose : PropTypes.func,
  open: PropTypes.bool,
  airline: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object
  ]),
  selectedAirports: PropTypes.array,
  storeAirline: PropTypes.func,
  countries: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  airline: makeSelectAirline(),
  open: makeSelectOpen(),
  airports: makeSelectAirports(),
  selectedAirports: makeSelectSelectedAirports(),
  countries: makeSelectCountries()
});

export function mapDispatchToProps(dispatch) {
  return {
    handleClose: () => {
      dispatch(handleClose());
    },
    storeAirline: (values,setErrors,setStatus) => {
      dispatch(storeAirline(values,setErrors,setStatus));
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
)(AirlineForm);
