import axios from 'axios';

const employeeApi = axios.create({
  baseURL: 'https://cmartemployeetest-4gsjrf7xyq-as.a.run.app',
  headers: {
    'Content-Type': 'application/json'
  }
});

/**
 intercept any error responses from the employeeApi
 and check if the token is no longer valid.
 ie. Token has expired or user is no longer
 authenticated.
 logout the user if the token has expired
**/

employeeApi.interceptors.request.use(
    function(config) {
      const token = localStorage.getItem("token"); 
      if (token) {
        config.headers["Authorization"] = 'Bearer ' + token;
      }
      return config;
    },
    function(error) {
      return Promise.reject(error);
    }
  );

export default employeeApi;
