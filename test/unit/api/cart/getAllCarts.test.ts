import getAllCarts from '../../../../src/api/cart/getAllCarts';

import type { Cart, CartProduct } from '../../../../src/api/cart/getCart';

describe('getAllCarts - API function', () => {
    it('should return an array of Carts', async () => {
        const actual = await getAllCarts();
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

        for (const actualCart of actual) {
            expect(actualCart).toEqual(expect.objectContaining<Cart>(expected));
        }
    });
});
