import {
  ADD_EMPLOYEE,
  ADD_EMPLOYEE_SUCCESS,
  ADD_EMPLOYEE_FAIL,
} from '../actions/types'

const initialState = {
  name: '',
  email: '',
  password: '',
  phoneNo: '',
  gender: '',
  storeId: '',
  roles: [],
  address: {
    street: '',
    postcode: '',
    area: '',
    state: '',
  },
}

function addEmployeeReducer(state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case ADD_EMPLOYEE_SUCCESS:
      console.log(payload)

      return {
        ...state,
        name: payload.name,
        email: payload.email,
        password: payload.password,
        phoneNo: payload.phoneNo,
        gender: payload.gender,
        storeId: payload.storeId,
        roles: payload.roles,
        address: {
          street: payload.street,
          postcode: payload.postcode,
          area: payload.street,
          state: payload.state,
        },
      };

      case ADD_EMPLOYEE_FAIL:

    default:
      return state
  }
}

export default addEmployeeReducer
