import {
  GET_ORDER_COUNT,
  GET_ORDER,
  GET_ORDER_COUNT_FAIL,
  GET_ORDER_FAIL,
  GET_TO_DELIVER_COUNT,
  GET_TO_DELIVER_COUNT_FAIL,
  GET_TO_DELIVER,
  GET_TO_DELIVER_FAIL,
  GET_TO_PACK_COUNT,
  GET_TO_PACK_COUNT_FAIL,
  GET_TO_PACK,
  GET_TO_PACK_FAIL, 
} from '../actions/types'

const initialState = {
  count: 0,
  loading: true,
  orders: [],
  toDeliverCount:0,
  toDeliver:[],
  toPackCount:0,
  toPack:[]
}

function orderReducer(state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case GET_ORDER_COUNT:
      return {
        ...state,
        loading: false,
        count: payload.count,
      }
    case GET_ORDER:
      // console.log(payload)
      return {
        ...state,
        loading: false,
        orders: payload,
      }
    case GET_TO_DELIVER_COUNT:
      console.log('DELIVERCOUNT :'+ payload.count)
      return {
        ...state,
        loading: false,
        toDeliverCount: payload.count,
      }
    case GET_TO_DELIVER:
      // console.log(payload)
      return {
        ...state,
        loading: false,
        toDeliver: payload,
      }
    case GET_TO_PACK_COUNT:
     
      return {
        ...state,
        loading: false,
        toPackCount: payload.count,
      }
    case GET_TO_PACK:
      // console.log(payload)
      return {
        ...state,
        loading: false,
        toPack: payload,
      }
    case GET_ORDER_COUNT_FAIL:
    case GET_ORDER_FAIL:
    case GET_TO_DELIVER_COUNT_FAIL:
    case GET_TO_DELIVER_FAIL:
    case GET_TO_PACK_COUNT_FAIL:
    case GET_TO_PACK_FAIL:

    default:
      return state
  }
}

export default orderReducer
