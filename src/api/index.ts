import axios from 'axios';

export const baseURL = 'https://fakestoreapi.com/';

export const fakeStoreApi = axios.create({
    baseURL,
    timeout: 5000
});
