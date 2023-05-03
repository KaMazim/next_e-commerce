import MockAdapter from 'axios-mock-adapter';

import { baseURL, fakeStoreApi } from '@/api';

import getProduct from '@/api/product/getProduct';

import type { Product } from '@/api/product/getProduct';

describe('getProduct - API function', () => {
    let mock: MockAdapter;

    beforeAll(() => {
        mock = new MockAdapter(fakeStoreApi);
    });

    afterEach(() => {
        expect(mock.history.get[0].baseURL).toEqual(baseURL);

        mock.reset();
    });

    it('should return null when given 0 as ProductId', async () => {
        const expectedId = 0;

        mock.onGet(baseURL + `products/${expectedId}`).reply(404);

        const expected = null;

        const actual = await getProduct(expectedId);

        expect(mock.history.get[0].url).toEqual(`products/${expectedId}`);
        expect(actual).toBe(expected);
    });

    it('should return null given ProductId does not exist', async () => {
        const expectedId = Infinity;

        mock.onGet(baseURL + `products/${expectedId}`).reply(404);

        const expected = null;

        const actual = await getProduct(expectedId);

        expect(mock.history.get[0].url).toEqual(`products/${expectedId}`);
        expect(actual).toBe(expected);
    });

    it('should return null when fetching fails', async () => {
        const expectedId = 1;

        mock.onGet(baseURL + `products/${expectedId}`).networkErrorOnce();

        const actual = await getProduct(expectedId);
        const expected = null;

        expect(mock.history.get[0].url).toEqual(`products/${expectedId}`);
        expect(actual).toEqual(expected);
    });

    it('should return a Product when given an ProductId', async () => {
        const expectedId = 1;

        const productMock: Product = {
            id: expectedId,
            title: 'Mens Casual Slim Fit',
            price: 15.99,
            description:
                'The color could be slightly different between on the screen and in practice.',
            category: "men's clothing",
            image: 'image_url',
            rating: { rate: 2.1, count: 430 }
        };

        mock.onGet(baseURL + `products/${expectedId}`).reply(200, productMock);

        const expected: Product = {
            id: expectedId,
            title: expect.any(String),
            price: expect.any(Number),
            description: expect.any(String),
            category: expect.any(String),
            image: expect.any(String),
            rating: {
                rate: expect.any(Number),
                count: expect.any(Number)
            }
        };

        const actual = await getProduct(expectedId);

        expect(mock.history.get[0].url).toEqual(`products/${expectedId}`);
        expect(actual).toEqual(expect.objectContaining<Product>(expected));
    });
});
