import React from 'react';
import axios from 'axios';

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response) {
  if (response.status === 204 || response.status === 205) {
    return null;
  }
  return response.data;
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function catchErrors(error) {
  //console.log(error.response.data);
  const newError = new Error(JSON.stringify(error.response.data.message));
  newError.response = error.response.data;
  newError.response.status = error.response.status;
  throw newError;
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export default function request(options) {
  axios.defaults.headers.common['Accept'] = "application/json";
  axios.defaults.headers.common['Content-Type'] = "application/json";
  console.log(options);
  return axios(options)
        .then(parseJSON)
        .catch(catchErrors);
}
