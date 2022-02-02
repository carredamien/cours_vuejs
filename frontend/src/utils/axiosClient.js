import axios from 'axios'

axios.defaults.baseURL =  process.env.VUE_APP_AXIOS_BASE_URL
// console.log('process.env.VUE_APP_AXIOS_BASE_URL', process.env.VUE_APP_AXIOS_BASE_URL);

if (localStorage.getItem('currentUser')) {
  let currentUser = localStorage.getItem('currentUser');
  currentUser = JSON.parse(currentUser);
  axios.defaults.headers.common.Authorization = "Bearer " + currentUser.token;
}

export default axios;