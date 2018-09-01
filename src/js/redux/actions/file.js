export const GET_FILE_START = 'GET_FILE_START';
export const GET_FILE_ERROR = 'GET_FILE_ERROR';
export const GET_FILE_SUCCESS = 'GET_FILE_SUCCESS';
export const INCREMENT = 'INCREMENT';
export const DECRESS   = 'DECRESS';

export function getFiles(data) {
  return {
    type: GET_FILE_START,
    data
  };
}
export function increment() {
  return {
    type: INCREMENT,
  };
}

export function decress() {
  return {
    type: DECRESS,
  };
}