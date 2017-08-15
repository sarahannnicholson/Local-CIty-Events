import $ from 'jquery';
import * as constants from '../constants';

export const MAP_ERROR = 'MAP_ERROR';
export const MAP_SUCCESS = 'MAP_SUCCESS';
export const MAP_FAILURE = 'MAP_FAILURE';


export function getCityCoordinatesAction(cityName) {

  return function(dispatch) {
    const url = constants.ServerApiPaths.cityCoordinates;
    const postData = {
      cityName: cityName
    };
    const requestSettings = {
      url: url,
      data: postData,
      type: "GET",
      success: (json) => dispatch(cityDataSuccess(json)),
      error: () => {
        cityDataFailed()
      }
    };

    $.get(requestSettings)
  }
}

function cityDataSuccess(data) {
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

function cityDataFailed(){
    return{
        type: MAP_FAILURE
    }
}