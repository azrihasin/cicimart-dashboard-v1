
import {
  CLOSE_SIDEBAR, OPEN_SIDEBAR
} from './types';


export const openSidebar = () => async dispatch => {
    
    try {  
      dispatch({
        type: OPEN_SIDEBAR
      });
    } catch (err) {
     
    }
  };


export const closeSidebar = () => async dispatch => {

    try {  
      dispatch({
        type: CLOSE_SIDEBAR
      });
    } catch (err) {
     
    }
  };