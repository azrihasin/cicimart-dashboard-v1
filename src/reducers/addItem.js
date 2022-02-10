import {
    ADD_PRODUCTINFO,
    ADD_PRODUCTDESC ,
    ADD_PRODUCTDETAIL ,
    ADD_PRODUCTSUCCESS,
    
  } from '../actions/types';
  
  const initialState = {
    code :'',
    nameEn :'',
    nameBm :'',
    descEn :'',
    descBm :'',
    category :'',
    brand :'',
    weight :'',
    price :'',
    discount :'',
    reward :'',
    stock :''
  };
  
  function addItemReducer(state = initialState, action) {
    const { type, payload } = action;
  
    switch  (type) {
      case ADD_PRODUCTINFO:
        console.log(payload)
        return {
          ...state,
          code: payload.code,
          nameEn: payload.nameEn,
          nameBm: payload.nameBm,
        };
      case ADD_PRODUCTDESC:
        console.log(payload)
        return {
          ...state,
          descEn: payload.descEn,
          descBm: payload.descBm,
          category: payload.category,
          brand: payload.brand,
          weight: payload.weight,
        };
      case ADD_PRODUCTDETAIL:
        console.log(payload)
        return {
          ...state,
          price: payload.price,
          discount: payload.discount,
          reward: payload.reward,
          stock: payload.stock,

        };
      case ADD_PRODUCTSUCCESS:
        console.log(payload)
        return {
          ...state,
          code :'',
          nameEn :'',
          nameBm :'',
          descEn :'',
          descBm :'',
          category :'',
          brand :'',
          weight :'',
          price :'',
          discount :'',
          reward :'',
          stock :''

        };
    
      default:
        return state;
    }
  }
  
  export default addItemReducer;