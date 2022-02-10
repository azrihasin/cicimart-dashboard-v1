import employeeApi from '../utils/employeeApi'
import { setAlert } from './alert'
import {
  GET_EMPLOYEE,
  GET_EMPLOYEE_COUNT,
  GET_EMPLOYEE_COUNT_FAIL,
  GET_EMPLOYEE_FAIL,
} from './types'

// Get count
export const getEmployeeCount = (store) => async (dispatch) => {
  var session_url = `/employee/find/all/active/0/12/${store}`

  try {
    const res = await employeeApi.get(session_url)

    console.log(res)

    dispatch({
      type: GET_EMPLOYEE_COUNT,
      payload: res.data,
    })
  } catch (err) {
    dispatch({
      type: GET_EMPLOYEE_COUNT_FAIL,
    })
  }
}

// Get item
export const getEmployee = (store, skip, limit) => async (dispatch) => {
  try {
    const res = await employeeApi.get(
      `/employee/find/all/active/${skip}/${limit}/${store}`,
    )

    if (skip == 0) {
      dispatch({
        type: GET_EMPLOYEE,
        payload: res.data.employees,
      })
    } else {
      dispatch({
        type: GET_EMPLOYEE,
        payload: res.data,
      })
    }

    
  } catch (err) {
    const errors = err.response.data.errors

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
    }

    dispatch({
      type: GET_EMPLOYEE_FAIL,
    })
  }
}
