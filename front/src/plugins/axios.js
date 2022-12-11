import Axios from "axios";
const axios = Axios.create({
  baseURL: process.env.VUE_APP_API,
  withCredentials: true,
  headers:{
    'X-Requested-With':'XMLHttpRequest',
  }
});
axios.interceptors.request.use(function (config) {
  let token = localStorage.getItem('token');
  config.headers.Authorization =  token ? `Bearer ${token}` : '';
  return config;
});
export default axios;