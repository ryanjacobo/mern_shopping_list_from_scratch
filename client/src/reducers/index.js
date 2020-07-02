//brings together all reducers

import { combineReducers } from 'redux';
import itemReducer from './itemReducer';

export default combineReducers({
    item: itemReducer
})
