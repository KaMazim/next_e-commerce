import axios from 'axios';

import { Client } from '@googlemaps/google-maps-services-js';

export const fakeStoreApi = axios.create({
    baseURL: 'https://fakestoreapi.com/',
    timeout: 2000
});

export const mapApi = new Client({
    config: {
        timeout: 2000
    }
});
