import axios from 'axios';

const api = axios.create({
    baseURL: 'https://backendeloyaqui.herokuapp.com'
})

export default api;