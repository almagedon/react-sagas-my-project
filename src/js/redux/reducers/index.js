import { combineReducers } from 'redux';
import app from 'redux/reducers/app';
import file from 'redux/reducers/file';

export default combineReducers({
  app,
  persist:file
});
