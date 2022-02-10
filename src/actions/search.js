
import inventoryApi from '../utils/inventoryApi';
import { setAlert } from './alert';
import {
     GET_PRODUCT_SEARCH, 
     GET_PRODUCT_SEARCH_FAIL
} from './types';

// Get count
export const getProductCount = (store) => async dispatch => {

  var session_url = `/query/find/${store}/all/all/false/price-low-to-high/0/10/en`;



  try {

    const res = await inventoryApi.get(session_url);

    console.log(res)
  
    dispatch({
      type: GET_COUNT,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_COUNT_FAIL
    });
  }
};

// Get search product
export const getSearchProduct = (store, skip, limit) => async dispatch => {
  

  try {
    const res = await inventoryApi.get(`/query/find/${store}/all/all/false/none/${skip}/${limit}/en`);

    console.log(res)

    if(skip == 0){
      dispatch({
        type: GET_ITEM,
        payload: res.data.products
      });
    }else{
      dispatch({
        type: GET_ITEM,
        payload: res.data
      });
    }
    
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: GET_ITEM_FAIL
    });
  }
};

