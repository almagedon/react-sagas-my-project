import {
  GET_FILE_START,
  GET_FILE_ERROR,
  GET_FILE_SUCCESS,
  INCREMENT,
  DECRESS,
} from 'redux/actions/file';

const initialState = {
  loading: false,
  error: null,
  file: null,
  counter: 0,
};

const actionsMap = {
  [INCREMENT]: (state) => {
    const counter = state.counter + 1;

    return {
      ...state,
      counter
    }
  },
  [DECRESS]: (state) => {
    const counter = counter - 1;

    return {
      ...state,
      counter
    };
  },
};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}
