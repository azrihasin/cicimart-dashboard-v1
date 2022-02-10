import inventoryApi from '../utils/inventoryApi'
import { setAlert } from './alert'
import {
  GET_COUNT,
  GET_COUNT_FAIL,
  GET_ITEM,
  GET_ITEM_FAIL,
  GET_DRAFT_COUNT,
  GET_DRAFT_COUNT_FAIL,
  GET_DRAFT,
  GET_DRAFT_FAIL,
} from './types'

// Get count
export const getCount = (store) => async (dispatch) => {
  console.log(store)

  var session_url = `/query/find/${store}/all/all/false/price-low-to-high/0/10/en`

  try {
    const res = await inventoryApi.get(session_url)

    console.log(res)

    dispatch({
      type: GET_COUNT,
      payload: res.data,
    })
  } catch (err) {
    dispatch({
      type: GET_COUNT_FAIL,
    })
  }
}

// Get item
export const getItem = (store, skip, limit) => async (dispatch) => {
  console.log('store number:' + store)

  try {
    const res = await inventoryApi.get(
      `/query/find/${store}/all/all/false/none/${skip}/${limit}/en`,
    )

    console.log(res)

    if (skip == 0) {
      dispatch({
        type: GET_ITEM,
        payload: res.data.products,
      })
    } else {
      dispatch({
        type: GET_ITEM,
        payload: res.data,
      })
    }
  } catch (err) {
    const errors = err.response.data.errors

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
    }

    dispatch({
      type: GET_ITEM_FAIL,
    })
  }
}

// Get count
export const getByNameCount = (store, keyword) => async (dispatch) => {
  

  var session_url = `/query/find/${store}/${keyword}/all/false/price-low-to-high/0/10/en`

  try {
    const res = await inventoryApi.get(session_url)

    console.log('Count res'+res)

    dispatch({
      type: GET_COUNT,
      payload: res.data,
    })
  } catch (err) {
    dispatch({
      type: GET_COUNT_FAIL,
    })
  }
}


export const getByName = (store, skip, limit, keyword) => async (dispatch) => {
  console.log('store number:' + store)
  console.log(keyword)
  console.log(skip)
  console.log(limit)

  try {
    const res = await inventoryApi.get(
      `/query/find/${store}/${keyword}/all/false/none/${skip}/${limit}/en`,
    )

    console.log(res)

    if (skip == 0) {
      dispatch({
        type: GET_ITEM,
        payload: res.data.products,
      })
    } else {
      dispatch({
        type: GET_ITEM,
        payload: res.data,
      })
    }
  } catch (err) {
    const errors = err.response.data.errors

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
    }

    dispatch({
      type: GET_ITEM_FAIL,
    })
  }
}

// Get draft count
export const getDraftCount = (store) => async (dispatch) => {
  console.log(store)

  var session_url = `/query/disabled/0/1`

  try {
    const res = await inventoryApi.get(session_url)

    console.log(res)

    dispatch({
      type: GET_DRAFT_COUNT,
      payload: res.data,
    })
  } catch (err) {
    dispatch({
      type: GET_DRAFT_COUNT_FAIL,
    })
  }
}

// Get item
export const getDraft = (skip,limit) => async (dispatch) => {
 

  try {
    const res = await inventoryApi.get(`/query/disabled/${skip}/${limit}`)

    console.log(res)


    if (skip == 0) {
      dispatch({
        type: GET_DRAFT,
        payload: res.data.products,
      })
    } else {
      dispatch({
        type: GET_DRAFT,
        payload: res.data,
      })
    }
  } catch (err) {
    const errors = err.response.data.errors

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
    }

    dispatch({
      type: GET_DRAFT_FAIL,
    })
  }
}
