import getUserCartHistory from '@/api/user/getUserCartHistory';

import type { UserCartHistory } from '@/api/user/getUserCartHistory';

import type { Cart, CartProduct } from '@/api/cart/getCart';

describe('getUserCartHistory - API function', () => {
    it('should return null when given 0', async () => {
        const expected = null;

        const actual = await getUserCartHistory(0);

        expect(actual).toBe(expected);
    });

    it('should return null when UserCartHistory not found', async () => {
        const expected = null;

        const actual = await getUserCartHistory(Infinity);

        expect(actual).toBe(expected);
    });

    it('should return a UserCartHistory when given an id', async () => {
        const expectedId = 1;

        const expected: UserCartHistory = {
            id: expectedId,
            email: expect.any(String),
            name: expect.objectContaining<UserCartHistory['name']>({
                firstname: expect.any(String),
                lastname: expect.any(String)
            }),
            carts: expect.arrayContaining<Cart>([
                expect.objectContaining<Cart>({
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
                })
            ])
        };

        const actual = await getUserCartHistory(expectedId);

        expect(actual).toEqual(
            expect.objectContaining<UserCartHistory>(expected)
        );
    });
});
