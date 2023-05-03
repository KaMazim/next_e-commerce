import getManyProducts from '@/api/product/getManyProducts';

import type { Product } from '@/api/product/getProduct';

describe('getManyProducts - API function', () => {
    it('should return an empty array when given an empty array', async () => {
        const expected: Product[] = [];
        const actual = await getManyProducts([]);

        expect(actual).toEqual(expected);
    });

    it('should return an array of Products when given an array of Product Ids', async () => {
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

        const actual = await getManyProducts([2, 3]);

        for (const actualProduct of actual) {
            expect(actualProduct).toEqual(
                expect.objectContaining<Product>(expected)
            );
        }
    });

    it('should return an array of Products with length less than or equal to the length of the Ids array it received', async () => {
        const actual = await getManyProducts([2, 6, Infinity]);
        const expected = 3;

        expect(actual.length).toBeLessThanOrEqual(expected);
    });
});
