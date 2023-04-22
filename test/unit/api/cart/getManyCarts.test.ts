import getManyCarts from '../../../../src/api/cart/getManyCarts';

import type { Cart, CartProduct } from '../../../../src/api/cart/getCart';

describe('getManyCarts - API function', () => {
    it('should return an empty array when given an empty array', async () => {
        const expected: Cart[] = [];
        const actual = await getManyCarts([]);

        expect(actual).toEqual(expected);
    });

    it('should return an array of Carts when given an array of Cart Ids', async () => {
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

        const actual = await getManyCarts([2, 3]);

        for (const actualCart of actual) {
            expect(actualCart).toEqual(expect.objectContaining<Cart>(expected));
        }
    });

    it('should return an array of Carts with length less than or equal to the length of the Ids array it received', async () => {
        const actual = await getManyCarts([2, 6, Infinity]);
        const expected = 3;

        expect(actual.length).toBeLessThanOrEqual(expected);
    });
});
