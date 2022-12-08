import host from './config';
import axios from 'axios'



const api = (url) => {
    return axios.get(host+url);
}

export default api;