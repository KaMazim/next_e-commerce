import { fakeStoreApi } from '..';

import type { User } from '../user/getUser';

import { getManyCartsFromResponse } from './getCart';

import type { Cart, CartResponse } from './getCart';

export const getUserCartResponses = async (
    userId: User['id']
): Promise<CartResponse[]> => {
    const { data: cartResponses } = await fakeStoreApi.get<CartResponse[]>(
        `carts/user/${userId}`
    );

    return cartResponses;
};

const getUserCarts = async (userId: User['id']): Promise<Cart[]> => {
    const cartResponses = await getUserCartResponses(userId);
    const carts = await getManyCartsFromResponse(cartResponses);

    return carts;
};

export default getUserCarts;
