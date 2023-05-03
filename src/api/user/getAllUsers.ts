import { fakeStoreApi } from '..';

import type { User } from './getUser';

const getAllUsers = async (): Promise<User[]> => {
    try {
        const { data: users = [] } = await fakeStoreApi.get<User[] | undefined>(
            `users`
        );

        return users;
    } catch (error) {
        return [];
    }
};

export default getAllUsers;
