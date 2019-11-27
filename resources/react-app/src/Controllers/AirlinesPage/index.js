/*
 * AirlinesPage
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

import AirlineForm from 'containers/AirlineForm';
import ConfirmitationDialog from 'components/ConfirmitationDialog';

import {
  handleOpen,
  deleteAirline
} from 'containers/AirlineForm/actions';

import {
  handleConfirmOpen,
  handleConfirmClose
} from 'containers/App/actions';

import {
  makeSelectAirlines,
  makeSelectAirlinesLoading,
} from 'containers/AirlineForm/selectors';

import {
  makeSelectOpenConfirm,
  makeSelectConfirmItemId,
} from 'containers/App/selectors';

export function AirlinesPage({
  loading,
  handleClickOpen,
  airlines,
  deleteAirline,
  handleConfirmOpen,
  handleConfirmClose,
  confirm_item_id,
  openConfirm
  }) {
  const columns = [
      { title: 'Name', field: 'name' },
      { title: 'Country', field: 'country_name' },
      { title: 'Airports', field: 'airport_names' },
    ];

  let data = [];
  if(airlines.length > 0){
    data = airlines.map(airline => (
      {
        id: airline.id,
        name: airline.name,
        country_name: airline.country.name,
        country: airline.country,
        airport_names: airline.airports.map(airport => airport.name).join(),
        airports: airline.airports,
      }
    ));
  }

  return (
    <Container>
      <MaterialTable
        title="Airlines"
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
        options={{"style": "max-width: 100%;"}}
      />
    <AirlineForm />
    <ConfirmitationDialog
      open={openConfirm}
      handleClose={handleConfirmClose}
      action={() => {deleteAirline(confirm_item_id); handleConfirmClose();}}
      text={'Do you want delete this airline? Once it\'s done, it can\'t be undone. Please confirm your action.'} />
  </Container>
  );
}

AirlinesPage.propTypes = {
  airlines: PropTypes.array,
  loading: PropTypes.bool,
  handleClickOpen: PropTypes.func,
  deleteAirline: PropTypes.func,
  handleConfirmOpen: PropTypes.func,
  handleConfirmClose: PropTypes.func,
  openConfirm: PropTypes.bool,
  confirm_item_id: PropTypes.number,
};

const mapStateToProps = createStructuredSelector({
  airlines: makeSelectAirlines(),
  loading: makeSelectAirlinesLoading(),
  openConfirm: makeSelectOpenConfirm(),
  confirm_item_id: makeSelectConfirmItemId(),
});

export function mapDispatchToProps(dispatch) {
  return {
    handleClickOpen: (event, airline = false) => {
      airline = Object.entries(airline).length === 0 && airline.constructor === Object ? false : airline;
      dispatch(handleOpen(airline));
    },
    deleteAirline: (id) => {
      dispatch(deleteAirline(id));
    },
    handleConfirmOpen: (event, airline) => {
      dispatch(handleConfirmOpen(airline.id));
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
)(AirlinesPage);
