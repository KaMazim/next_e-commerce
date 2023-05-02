import getUserCarts from '../../../../src/api/cart/getUserCarts';

import type { Cart, CartProduct } from '../../../../src/api/cart/getCart';

describe('getUserCarts - API function', () => {
    it('should return an empty array when given an invalid UserId', async () => {
        const expected: Cart[] = [];
        const actual = await getUserCarts(Infinity);

        expect(actual).toEqual(expected);
    });

    it('should return an array of Carts when given a valid UserId', async () => {
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

        const actual = await getUserCarts(1);

        for (const actualCart of actual) {
            expect(actualCart).toEqual(expect.objectContaining<Cart>(expected));
        }
    });
});
