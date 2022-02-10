import axios from 'axios';



const loginApi = axios.create({
  baseURL: 'https://cmartemployeetest-4gsjrf7xyq-as.a.run.app',
  headers: {
    'Content-Type': 'application/json'
  }
});


export default loginApi;
