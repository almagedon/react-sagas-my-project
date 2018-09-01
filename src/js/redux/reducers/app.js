import { Map } from 'immutable';

import { INCREMENT, DECRESS, FILES, FILES_SELECTED } from 'redux/actions/app';

const initialState = Map({
  counter: 0,
  files: [],
  selected: [],
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
  [FILES]: (state, action) => {
    return state.merge(Map({
      files:action.payload,
    }));
  },
  [FILES_SELECTED]: (state, action) => {
    return state.merge(Map({
      selected:action.payload,
    }));
  },
};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}
