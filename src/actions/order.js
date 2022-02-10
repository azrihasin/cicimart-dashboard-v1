import orderApi from '../utils/orderApi'
import { setAlert } from './alert'
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
} from './types'

// Get count
export const getOrderCount = (store) => async (dispatch) => {
  
  var session_url = `/order/completed/manager/0/3`

  try {
    const res = await orderApi.get(session_url)

    console.log(res)

    dispatch({
      type: GET_ORDER_COUNT,
      payload: res.data,
    })
  } catch (err) {
    dispatch({
      type: GET_ORDER_COUNT_FAIL,
    })
  }
}

// Get item
export const getOrder = (store, skip, limit) => async (dispatch) => {
  try {
    const res = await orderApi.get(`/order/completed/manager/${skip}/${limit}`)

    console.log(res)

    if (skip == 0) {
      dispatch({
        type: GET_ORDER,
        payload: res.data.orders,
      })
    } else {
      dispatch({
        type: GET_ORDER,
        payload: res.data,
      })
    }
  } catch (err) {
    const errors = err.response.data.errors

    console.log(err)

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
    }

    dispatch({
      type: GET_ORDER_FAIL,
    })
  }
}

export const getToDeliverCount = (store) => async (dispatch) => {

  var session_url = `/order/to-deliver/manager/0/3`

  try {
    const res = await orderApi.get(session_url)

    console.log(res)

    dispatch({
      type: GET_TO_DELIVER_COUNT,
      payload: res.data,
    })


  } catch (err) {
    dispatch({
      type: GET_TO_DELIVER_COUNT_FAIL,
    })
  }
}

export const getToDeliver = (store, skip, limit) => async (dispatch) => {
  try {

    
    const res = await orderApi.get(`/order/to-deliver/manager/${skip}/${limit}`)


    if (skip == 0) {
      dispatch({
        type: GET_TO_DELIVER,
        payload: res.data.orders,
      })
    } else {
      dispatch({
        type: GET_TO_DELIVER,
        payload: res.data,
      })
    }
  } catch (err) {
    const errors = err.response.data.errors

    console.log(err)

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
    }

    dispatch({
      type: GET_TO_DELIVER_FAIL,
    })
  }
}


export const getToPackCount = (store) => async (dispatch) => {

  var session_url = `/order/to-pack/manager/0/3`

  try {
    const res = await orderApi.get(session_url)

    console.log(res)

    dispatch({
      type: GET_TO_PACK_COUNT,
      payload: res.data,
    })


  } catch (err) {
    dispatch({
      type: GET_TO_PACK_COUNT_FAIL,
    })
  }
}

export const getToPack = (store, skip, limit) => async (dispatch) => {
  try {

    
    const res = await orderApi.get(`/order/to-pack/manager/${skip}/${limit}`)

    console.log(res)

    if (skip == 0) {
      dispatch({
        type: GET_TO_PACK,
        payload: res.data.orders,
      })
    } else {
      dispatch({
        type: GET_TO_PACK,
        payload: res.data,
      })
    }
  } catch (err) {
    const errors = err.response.data.errors

    console.log(err)

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
    }

    dispatch({
      type: GET_TO_PACK_FAIL,
    })
  }
}

