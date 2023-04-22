import api from '..';

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
    const { data: user } = await api.get<User | undefined>(`users/${userId}`);

    return user?.id != null ? user : null;
};

export default getUser;
