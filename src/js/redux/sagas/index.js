import { all } from 'redux-saga/effects';

import file from 'redux/sagas/file';

export default function* rootSaga() {
  yield all([
    ...file,
  ]);
}
