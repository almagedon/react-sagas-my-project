import { Map } from 'immutable';

import {
  GET_FILE_START,
  GET_FILE_ERROR,
  GET_FILE_SUCCESS,
  INCREMENT, 
  DECRESS,
} from 'redux/actions/file';

const initialState = Map({
  loading: false,
  error: null,
  file: null,
  counter: 0,
});

const actionsMap = {
  [INCREMENT]: (state) => {
    const counter = state.get('counter') + 1;

    return state.merge(Map({
      counter,
    }));
  },
  [DECRESS]: (state) => {
    const counter = state.get('counter') - 1;

    return state.merge(Map({
      counter,
    }));
  },
  // Async action
  [GET_FILE_START]: (state) => {
    return state.merge(Map({
      loading: true,
      error: null,
      file: null,
    }));
  },
  [GET_FILE_ERROR]: (state, action) => {
    return state.merge(Map({
      loading: false,
      error: action.error.message,
    }));
  },
  [GET_FILE_SUCCESS]: (state, action) => {
    return state.merge(Map({
      loading: false,
      file: action.data,
    }));
  },
};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}
