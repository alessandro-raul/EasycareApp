import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.1.9/APIRestful/source/Controllers'
})

export default api;