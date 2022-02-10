import axios from 'axios';

const inventoryApi = axios.create({
  baseURL: 'https://cmartproducttest-4gsjrf7xyq-as.a.run.app',
  headers: {
    'Content-Type': 'application/json'
  }
});

/**
 intercept any error responses from the productApi
 and check if the token is no longer valid.
 ie. Token has expired or user is no longer
 authenticated.
 logout the user if the token has expired
**/

inventoryApi.interceptors.request.use(
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

export default inventoryApi;
