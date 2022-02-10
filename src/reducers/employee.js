import {
  GET_EMPLOYEE, GET_EMPLOYEE_COUNT, GET_EMPLOYEE_COUNT_FAIL,
  GET_EMPLOYEE_FAIL
} from '../actions/types';
  
  const initialState = {
    emp_count: 0,
    loading: true,
    employee: [],
  };
  
  function employeeReducer(state = initialState, action) {
    const { type, payload } = action;
  
    switch  (type) {
      case  GET_EMPLOYEE_COUNT :
        console.log(payload)
        return {
          ...state,
          loading: false,
          emp_count: payload.count,
        };
      case GET_EMPLOYEE :
        return {
          ...state,
          loading: false,
          employee: payload
        };
      case GET_EMPLOYEE_COUNT_FAIL:
      case GET_EMPLOYEE_FAIL :
    
      default:
        return state;
    }
  }
  
  export default employeeReducer;