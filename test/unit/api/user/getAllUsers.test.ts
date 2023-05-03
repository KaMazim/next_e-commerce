import MockAdapter from 'axios-mock-adapter';

import { baseURL, fakeStoreApi } from '@/api';

import getAllUsers from '@/api/user/getAllUsers';

import type { User } from '@/api/user/getUser';

const currentUrl = 'users';

const url = baseURL + currentUrl;

describe('getAllUsers - API function', () => {
    let mock: MockAdapter;

    beforeAll(() => {
        mock = new MockAdapter(fakeStoreApi);
    });

    afterEach(() => {
        expect(mock.history.get[0].baseURL).toEqual(baseURL);
        expect(mock.history.get[0].url).toEqual(currentUrl);

        mock.reset();
    });

    it('should return an array of Carts', async () => {
        const usersMock: User[] = [
            {
                address: {
                    geolocation: { lat: '-37.3159', long: '81.1496' },
                    city: 'kilcoole',
                    street: 'new road',
                    number: 7682,
                    zipcode: '12926-3874'
                },
                id: 1,
                email: 'john@gmail.com',
                username: 'johnd',
                password: 'm38rmF$',
                name: { firstname: 'john', lastname: 'doe' },
                phone: '1-570-236-7033'
            },
            {
                address: {
                    geolocation: { lat: '-37.3159', long: '81.1496' },
                    city: 'kilcoole',
                    street: 'Lovers Ln',
                    number: 7267,
                    zipcode: '12926-3874'
                },
                id: 2,
                email: 'morrison@gmail.com',
                username: 'mor_2314',
                password: '83r5^_',
                name: { firstname: 'david', lastname: 'morrison' },
                phone: '1-570-236-7033'
            }
        ];

        mock.onGet(url).reply(200, usersMock);

        const actual = await getAllUsers();

        const expected: User = {
            id: expect.any(Number),
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

        for (const actualUser of actual) {
            expect(actualUser).toEqual(expect.objectContaining<User>(expected));
        }
    });

    it('should return an empty array when fetching fails', async () => {
        mock.onGet(url).networkErrorOnce();

        const actual = await getAllUsers();
        const expected: User[] = [];

        expect(actual).toEqual(expected);
    });
});
