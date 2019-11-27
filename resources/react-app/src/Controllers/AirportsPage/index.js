/*
 * AirportsPage
 *
 * products in table with filter options
 */
import React, { useEffect, memo, useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import injectSaga from 'utils/injectSaga';

import MaterialTable from 'material-table';
import Container from '@material-ui/core/Container';

import AirportForm from 'containers/AirportForm';
import ConfirmitationDialog from 'components/ConfirmitationDialog';

import {
  handleOpen,
  deleteAirport
} from 'containers/AirportForm/actions';

import {
  handleConfirmOpen,
  handleConfirmClose
} from 'containers/App/actions';

import {
  makeSelectAirports,
  makeSelectAirportsLoading,
} from 'containers/AirportForm/selectors';

import {
  makeSelectOpenConfirm,
  makeSelectConfirmItemId,
} from 'containers/App/selectors';

export function AirportsPage({
  loading,
  handleClickOpen,
  airports,
  deleteAirport,
  handleConfirmOpen,
  handleConfirmClose,
  confirm_item_id,
  openConfirm
  }) {

  const columns = [
      { title: 'Name', field: 'name' },
      { title: 'Coordinates', field: 'coordinates' },
      { title: 'Country', field: 'country_name' },
      { title: 'Airlines', field: 'airline_names' },
    ];

  let data = [];
  if(airports.length > 0){
    data = airports.map(airport => (
      {
        id: airport.id,
        name: airport.name,
        coordinates: '('+airport.latitude+', '+airport.longitude+')',
        country_name: airport.country.name,
        country: airport.country,
        airline_names: airport.airlines.map(airline => airline.name).join(),
        airlines: airport.airlines,
        latitude: airport.latitude,
        longitude: airport.longitude,
      }
    ));
  }

  return (
    <Container>
      <MaterialTable
        title="Airports"
        columns={columns}
        data={data}
        isLoading={loading}
        actions={[{
          "icon": "add_box",
          "isFreeAction": true,
          "onClick": handleClickOpen
        },
        {
          "icon": "edit",
          "onClick": handleClickOpen
        },
        {
          "icon": "delete",
          "onClick": handleConfirmOpen
        }]}
      />
    <AirportForm />
      <ConfirmitationDialog
        open={openConfirm}
        handleClose={handleConfirmClose}
        action={() => {deleteAirport(confirm_item_id); handleConfirmClose();}}
        text={'Do you want delete this airport? Once it\'s done, it can\'t be undone. Please confirm your action.'} />
  </Container>
  );
}

AirportsPage.propTypes = {
  airports: PropTypes.array,
  loading: PropTypes.bool,
  handleClickOpen: PropTypes.func,
  deleteAirport: PropTypes.func,
  handleConfirmOpen: PropTypes.func,
  handleConfirmClose: PropTypes.func,
  openConfirm: PropTypes.bool,
  confirm_item_id: PropTypes.number,
};

const mapStateToProps = createStructuredSelector({
  airports: makeSelectAirports(),
  loading: makeSelectAirportsLoading(),
  openConfirm: makeSelectOpenConfirm(),
  confirm_item_id: makeSelectConfirmItemId(),
});

export function mapDispatchToProps(dispatch) {
  return {
    handleClickOpen: (event, airport = false) => {
      airport = Object.entries(airport).length === 0 && airport.constructor === Object ? false : airport;
      dispatch(handleOpen(airport));
    },
    deleteAirport: (id) => {
      dispatch(deleteAirport(id));
    },
    handleConfirmOpen: (event, airport) => {
      dispatch(handleConfirmOpen(airport.id));
    },
    handleConfirmClose: () => {
      dispatch(handleConfirmClose());
    }
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(AirportsPage);
