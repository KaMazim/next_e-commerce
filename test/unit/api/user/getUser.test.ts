import getUser from '../../../../src/api/user/getUser';

import type { User } from '../../../../src/api/user/getUser';

describe('getUser - API function', () => {
    it('should return null when given 0', async () => {
        const expected = null;

        const actual = await getUser(0);

        expect(actual).toBe(expected);
    });

    it('should return null when User not found', async () => {
        const expected = null;

        const actual = await getUser(Infinity);

        expect(actual).toBe(expected);
    });

    it('should return a User when given an id', async () => {
        const expectedId = 1;

        const expected: User = {
            id: expectedId,
            email: expect.any(String),
            username: expect.any(String),
            password: expect.any(String),
            phone: expect.any(String),
            name: expect.objectContaining<User['name']>({
                firstname: expect.any(String),
                lastname: expect.any(String)
            }),
            address: expect.objectContaining<User['address']>({
                city: expect.any(String),
                street: expect.any(String),
                number: expect.any(Number),
                zipcode: expect.any(String),
                geolocation: expect.objectContaining<
                    User['address']['geolocation']
                >({
                    lat: expect.any(String),
                    long: expect.any(String)
                })
            })
        };

        const actual = await getUser(expectedId);

        expect(actual).toEqual(expect.objectContaining<User>(expected));
    });
});
