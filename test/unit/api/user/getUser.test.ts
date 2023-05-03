import MockAdapter from 'axios-mock-adapter';

import { baseURL, fakeStoreApi } from '../../../../src/api';

import getUser from '../../../../src/api/user/getUser';

import type { User } from '../../../../src/api/user/getUser';

describe('getUser - API function', () => {
    let mock: MockAdapter;

    beforeAll(() => {
        mock = new MockAdapter(fakeStoreApi);
    });

    afterEach(() => {
        expect(mock.history.get[0].baseURL).toEqual(baseURL);

        mock.reset();
    });

    it('should return null when given 0 as UserId', async () => {
        const expectedId = 0;

        mock.onGet(baseURL + `users/${expectedId}`).reply(404);

        const expected = null;

        const actual = await getUser(expectedId);

        expect(mock.history.get[0].url).toEqual(`users/${expectedId}`);
        expect(actual).toBe(expected);
    });

    it('should return null when given UserId does not exist', async () => {
        const expectedId = Infinity;

        mock.onGet(baseURL + `users/${expectedId}`).reply(404);

        const expected = null;

        const actual = await getUser(expectedId);

        expect(mock.history.get[0].url).toEqual(`users/${expectedId}`);
        expect(actual).toBe(expected);
    });

    it('should return null when fetching fails', async () => {
        const expectedId = 1;

        mock.onGet(baseURL + `users/${expectedId}`).networkErrorOnce();

        const actual = await getUser(expectedId);
        const expected = null;

        expect(mock.history.get[0].url).toEqual(`users/${expectedId}`);
        expect(actual).toEqual(expected);
    });

    it('should return a User when given an UserId', async () => {
        const expectedId = 1;

        const userMock: User = {
            address: {
                geolocation: { lat: '-37.3159', long: '81.1496' },
                city: 'kilcoole',
                street: 'new road',
                number: 7682,
                zipcode: '12926-3874'
            },
            id: expectedId,
            email: 'john@gmail.com',
            username: 'johnd',
            password: 'm38rmF$',
            name: { firstname: 'john', lastname: 'doe' },
            phone: '1-570-236-7033'
        };

        mock.onGet(baseURL + `users/${expectedId}`).reply(200, userMock);

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

        expect(mock.history.get[0].url).toEqual(`users/${expectedId}`);
        expect(actual).toEqual(expect.objectContaining<User>(expected));
    });
});
