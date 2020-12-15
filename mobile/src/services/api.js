import axios from 'axios';

const api = axios.create({
    baseURL: 'https://onmistack-bend.herokuapp.com',
});

export default api;