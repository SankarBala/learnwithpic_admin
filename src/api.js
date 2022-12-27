import host from './config';
import axios from 'axios'

axios.defaults.baseURL = `${host}/api`;
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';


// const api = (url) => {
//     return axios.get(host+url);
// }

export default axios;