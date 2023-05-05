import MockAdapter from 'axios-mock-adapter';

import { baseURL, fakeStoreApi } from '@/api';

import getCart from '@/api/cart/getCart';
import type { Cart, CartProduct, CartResponse } from '@/api/cart/getCart';

import type { Product } from '@/api/product/getProduct';

describe('getCart - API function', () => {
    let mock: MockAdapter;

    beforeAll(() => {
        mock = new MockAdapter(fakeStoreApi);
    });

    afterEach(() => {
        expect(mock.history.get[0].baseURL).toEqual(baseURL);

        mock.reset();
    });

    const productsMock: Product[] = [
        {
            id: 1,
            title: 'Mens Casual Slim Fit',
            price: 15.99,
            description:
                'The color could be slightly different between on the screen and in practice.',
            category: "men's clothing",
            image: 'image_url',
            rating: { rate: 2.1, count: 430 }
        },
        {
            id: 2,
            title: 'Mens Casual Slim Fit',
            price: 15.99,
            description:
                'The color could be slightly different between on the screen and in practice.',
            category: "men's clothing",
            image: 'image_url',
            rating: { rate: 2.1, count: 430 }
        }
    ];

    it('should return null when given 0 as CartId', async () => {
        const expectedId = 0;

        mock.onGet(baseURL + `carts/${expectedId}`).reply(404);

        const expected = null;

        const actual = await getCart(expectedId);

        expect(mock.history.get[0].url).toEqual(`carts/${expectedId}`);
        expect(actual).toBe(expected);
    });

    it('should return null when given CartId does not exist', async () => {
        const expectedId = Infinity;

        mock.onGet(baseURL + `carts/${expectedId}`).reply(404);

        const expected = null;

        const actual = await getCart(expectedId);

        expect(mock.history.get[0].url).toEqual(`carts/${expectedId}`);
        expect(actual).toBe(expected);
    });

    it('should return null when fetching fails', async () => {
        const expectedId = 1;

        mock.onGet(baseURL + `carts/${expectedId}`).networkErrorOnce();

        const actual = await getCart(expectedId);
        const expected = null;

        expect(mock.history.get[0].url).toEqual(`carts/${expectedId}`);
        expect(actual).toEqual(expected);
    });

    it('should return a Cart when given a CartId', async () => {
        const expectedId = 1;

        const cartMock: CartResponse = {
            id: expectedId,
            userId: 1,
            date: '2020-03-02T00:00:00.000Z',
            products: [
                { productId: 1, quantity: 4 },
                { productId: 2, quantity: 6 }
            ]
        };

        mock.onGet(baseURL + `carts/${expectedId}`).reply(200, cartMock);

        mock.onGet(baseURL + `products/${1}`).reply(200, productsMock[0]);
        mock.onGet(baseURL + `products/${2}`).reply(200, productsMock[1]);

        const expected: Cart = {
            id: expectedId,
            userId: expect.any(Number),
            date: expect.any(String),
            products: expect.arrayContaining<CartProduct>([
                expect.objectContaining<CartProduct>({
                    id: expect.any(Number),
                    title: expect.any(String),
                    price: expect.any(Number),
                    description: expect.any(String),
                    category: expect.any(String),
                    image: expect.any(String),
                    rating: {
                        rate: expect.any(Number),
                        count: expect.any(Number)
                    },
                    quantity: expect.any(Number)
                })
            ])
        };

        const actual = await getCart(expectedId);

        expect(mock.history.get[0].url).toEqual(`carts/${expectedId}`);
        expect(actual).toEqual(expect.objectContaining<Cart>(expected));
    });
});
