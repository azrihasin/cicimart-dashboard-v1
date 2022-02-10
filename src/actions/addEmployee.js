import employeeApi from '../utils/employeeApi'
import {
    ADD_EMPLOYEE ,
    ADD_EMPLOYEE_SUCCESS ,
    ADD_EMPLOYEE_FAIL ,
} from './types'


//Submit Product
export const submitEmployee = (store, data, job) => async (dispatch) => {
  alert('SUCCESS ADD EMPLOYEE')

  console.log('data' + data)  

  const employee = {
    name: data.name,
        email: data.email,
        password: data.password,
        phoneNo: data.phoneNo,
        gender: data.gender,
        storeId: store,
        roles: job,
        address: {
          street: data.street,
          postcode: data.postcode,
          area: data.street,
          state: data.state,
        },
  }

  console.log(employee)

  var session_url = '/employee/register'

  try {
    const res = await employeeApi.post(session_url, employee)
   
    dispatch({
      type: ADD_EMPLOYEE_SUCCESS,
    })

    console.log(res)
  } catch (err) {
    console.log(err)
    dispatch({
      type: ADD_EMPLOYEE_FAIL,
    })
  }
}
