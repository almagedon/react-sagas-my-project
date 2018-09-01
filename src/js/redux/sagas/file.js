import { takeLatest, call, put } from 'redux-saga/effects';

import {
  GET_FILE_START,
  GET_FILE_ERROR,
  GET_FILE_SUCCESS,
} from 'redux/actions/file';
//import api from 'api';

// -------- Get people

function createGetFile(isServer = false) {
  return function* (options) { // eslint-disable-line consistent-return
    try {
      const data = yield call(() => console.log('hola'));
      const action = { type: GET_FILE_SUCCESS, data };

      if (isServer) {
        return action;
      }

      yield put(action);
    } catch (error) {
      const action = { type: GET_FILE_ERROR, error };

      if (isServer) {
        return action;
      }

      yield put(action);
    }
  };
}

export const getFile = createGetFile();
export const getFileServer = createGetFile(true);


export function* getFileWatcher() {
  yield takeLatest(GET_FILE_START, getFile);
}


export default [
  getFileWatcher(),
];
