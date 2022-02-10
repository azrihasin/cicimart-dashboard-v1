import {
  CLOSE_SIDEBAR, OPEN_SIDEBAR
} from '../actions/types';
  
  const initialState = {
    open:true
  };
  
  function sidebarReducer(state = initialState, action) {
    const { type, payload } = action;
  
    switch  (type) {
      case OPEN_SIDEBAR:
        return {
        ...state,
          open:true
        };
      case CLOSE_SIDEBAR:
        return {
        ...state,
          open:false
        };
      default:
        return state;
    }
  }
  
  export default sidebarReducer;