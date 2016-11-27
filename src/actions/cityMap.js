import $ from 'jquery';
import * as constants from '../constants';

export const MAP_ERROR = 'MAP_ERROR';
export const MAP_SUCCESS = 'MAP_SUCCESS';
export const MAP_FAILURE = 'MAP_FAILURE';


export function getMap(cityName) {

  return function(dispatch) {
    const url = constants.ServerApiPaths.googleMap;
    const postData = {
      cityName: cityName
    };
    const requestSettings = {
      url: url,
      data: postData,
      type: "GET",
      success: (json) => dispatch(getMapSuccess(json)),
      error: () => {
        getMapFailed()
      }
    };

    $.get(requestSettings)
  }
}

export function getMapSuccess(data) {
  if(data.hasOwnProperty('noCityName')){
    return {
      type: MAP_ERROR,
      payload: data.noCityName
    }
  }
  else if(data.hasOwnProperty('lng') && data.hasOwnProperty('lat')){
    return {
      type: MAP_SUCCESS,
      payload: data
    }
  }
}

export function getMapFailed(){
    return{
        type: MAP_FAILURE
    }
}
