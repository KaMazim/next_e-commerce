import MockAdapter from 'axios-mock-adapter';

import { baseURL, fakeStoreApi } from '@/api';

import getManyCarts from '@/api/cart/getManyCarts';

import type { Cart, CartProduct, CartResponse } from '@/api/cart/getCart';

import type { Product } from '@/api/product/getProduct';

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

const getCartMock = (expectedId: CartResponse['id']): CartResponse => ({
    id: expectedId,
    userId: 1,
    date: '2020-03-02T00:00:00.000Z',
    products: [
        { productId: productsMock[0].id, quantity: 4 },
        { productId: productsMock[1].id, quantity: 6 }
    ]
});

const cartIds: Array<CartResponse['id']> = [1, 2, 3];

describe('getManyCarts - API function', () => {
    let mock: MockAdapter;

    beforeAll(() => {
        mock = new MockAdapter(fakeStoreApi);
    });

    afterEach(() => {
        mock.reset();
    });

    it('should return an empty array when given an empty array', async () => {
        const expected: Cart[] = [];
        const actual = await getManyCarts([]);

        expect(actual).toEqual(expected);
    });

    it('should return an array of Carts when given an array of Cart Ids', async () => {
        for (const cartId of cartIds) {
            mock.onGet(baseURL + `carts/${cartId}`).reply(
                200,
                getCartMock(cartId)
            );
        }

        for (const productMock of productsMock) {
            mock.onGet(baseURL + `products/${productMock.id}`).reply(
                200,
                productMock
            );
        }

        const expected: Cart = {
            id: expect.any(Number),
            userId: expect.any(Number),
            date: expect.any(Date),
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

        const actual = await getManyCarts(cartIds);

        for (const actualCart of actual) {
            expect(actualCart).toEqual(expect.objectContaining<Cart>(expected));
        }

        expect(mock.history.get[0].baseURL).toEqual(baseURL);
    });

    it('should return an array of Carts with length less than or equal to the length of the Ids array it received', async () => {
        for (const cartId of cartIds) {
            mock.onGet(baseURL + `carts/${cartId}`).reply(
                200,
                getCartMock(cartId)
            );
        }

        for (const productMock of productsMock) {
            mock.onGet(baseURL + `products/${productMock.id}`).reply(
                200,
                productMock
            );
        }

        const actual = await getManyCarts([...cartIds, Infinity]);
        const expected = 3;

        expect(actual.length).toBeLessThanOrEqual(expected);

        expect(mock.history.get[0].baseURL).toEqual(baseURL);
    });
});
