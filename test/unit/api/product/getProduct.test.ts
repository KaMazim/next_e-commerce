import getProduct from '../../../../src/api/product/getProduct';

import type { Product } from '../../../../src/api/product/getProduct';

describe('getProduct - API function', () => {
    it('should return null when passed 0', async () => {
        const expected = null;

        const actual = await getProduct(0);

        expect(actual).toBe(expected);
    });

    it('should return null when Product not found', async () => {
        const expected = null;

        const actual = await getProduct(Infinity);

        expect(actual).toBe(expected);
    });

    it('should return a Product when passed an id', async () => {
        const expectedId = 1;

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

        expect(actual).toEqual(expect.objectContaining<Product>(expected));
    });
});
