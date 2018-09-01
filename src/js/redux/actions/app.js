export const INCREMENT = 'INCREMENT';
export const DECRESS   = 'DECRESS';
export const FILES   = 'FILES';
export const FILES_SELECTED   = 'FILES_SELECTED';

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

export function pushFiles(data) {
  return {
    type: FILES,
    payload:[...data],
  };
}
export function pushSelected(data) {
  return {
    type: FILES_SELECTED,
    payload: data,
  };
}