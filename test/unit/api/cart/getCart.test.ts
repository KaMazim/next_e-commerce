import getCart from '@/api/cart/getCart';

import type { Cart, CartProduct } from '@/api/cart/getCart';

describe('getCart - API function', () => {
    it('should return null when given 0', async () => {
        const expected = null;

        const actual = await getCart(0);

        expect(actual).toBe(expected);
    });

    it('should return null when Cart not found', async () => {
        const expected = null;

        const actual = await getCart(Infinity);

        expect(actual).toBe(expected);
    });

    it('should return a Cart when given an id', async () => {
        const expectedId = 1;

        const expected: Cart = {
            id: expectedId,
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

        const actual = await getCart(expectedId);

        expect(actual).toEqual(expect.objectContaining<Cart>(expected));
    });
});
