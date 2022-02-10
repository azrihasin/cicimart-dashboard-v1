import { combineReducers } from 'redux';

import alert from './alert'
import auth from './auth'
import sidebar from './sidebar'
import item from './item'
import addItem from './addItem'
import employee from './employee'
import order from './order'

export default combineReducers({
  alert,
  auth,
  sidebar,
  item,
  addItem,
  employee,
  order
});
