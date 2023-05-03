import MockAdapter from 'axios-mock-adapter';

import { baseURL, fakeStoreApi } from '@/api';

import getManyProducts from '@/api/product/getManyProducts';

import type { Product } from '@/api/product/getProduct';

describe('getManyProducts - API function', () => {
    let mock: MockAdapter;

    beforeAll(() => {
        mock = new MockAdapter(fakeStoreApi);
    });

    afterEach(() => {
        mock.reset();
    });

    const productsMock: Product[] = [
        {
            id: 2,
            title: 'Mens Casual Slim Fit',
            price: 15.99,
            description:
                'The color could be slightly different between on the screen and in practice.',
            category: "men's clothing",
            image: 'image_url',
            rating: { rate: 2.1, count: 430 }
        },
        {
            id: 3,
            title: 'Mens Casual Slim Fit',
            price: 15.99,
            description:
                'The color could be slightly different between on the screen and in practice.',
            category: "men's clothing",
            image: 'image_url',
            rating: { rate: 2.1, count: 430 }
        }
    ];

    const productMockIds = productsMock.map((productMock) => productMock.id);

    const expected: Product = {
        id: expect.any(Number),
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

    it('should return an empty array when given an empty array', async () => {
        const expected: Product[] = [];
        const actual = await getManyProducts([]);

        expect(actual).toEqual(expected);
    });

    it('should return an array of Products when given an array of Product Ids', async () => {
        for (const productMock of productsMock) {
            mock.onGet(baseURL + `products/${productMock.id}`).reply(
                200,
                productMock
            );
        }

        const actual = await getManyProducts(productMockIds);

        for (const actualProduct of actual) {
            expect(actualProduct).toEqual(
                expect.objectContaining<Product>(expected)
            );
        }

        expect(mock.history.get[0].baseURL).toEqual(baseURL);
    });

    it('should return an array of Products with length equal to the amount of Products found', async () => {
        for (const productMock of productsMock) {
            mock.onGet(baseURL + `products/${productMock.id}`).reply(
                200,
                productMock
            );
        }

        mock.onGet(baseURL + `products/${Infinity}`).reply(404);

        const actual = await getManyProducts([...productMockIds, Infinity]);
        const expectedLength = 2;

        for (const actualProduct of actual) {
            expect(actualProduct).toEqual(
                expect.objectContaining<Product>(expected)
            );
        }

        expect(actual.length).toBe(expectedLength);

        expect(mock.history.get[0].baseURL).toEqual(baseURL);
    });

    it('should return an array of Products with length equal to the amount of Products successfully fetched', async () => {
        for (const productMock of productsMock) {
            mock.onGet(baseURL + `products/${productMock.id}`).reply(
                200,
                productMock
            );
        }

        mock.onGet(baseURL + `products/${1}`).reply(200, null);

        const actual = await getManyProducts([...productMockIds, 1]);
        const expectedLength = 2;

        for (const actualProduct of actual) {
            expect(actualProduct).toEqual(
                expect.objectContaining<Product>(expected)
            );
        }

        expect(actual.length).toBe(expectedLength);

        expect(mock.history.get[0].baseURL).toEqual(baseURL);
    });
});
