import { fakeStoreApi } from '..';

interface UserAddress {
    city: string;
    street: string;
    number: number;
    zipcode: string;
    geolocation: Record<'lat' | 'long', string>;
}

export interface User {
    id: number;
    email: string;
    username: string;
    password: string;
    phone: string;
    name: Record<'firstname' | 'lastname', string>;
    address: UserAddress;
}

const getUser = async (userId: number): Promise<User | null> => {
    try {
        const { data: user } = await fakeStoreApi.get<User>(`users/${userId}`);

        return user;
    } catch (error) {
        return null;
    }
};

export default getUser;
