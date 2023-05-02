import { fakeStoreApi } from '..';

import type { User } from '../user/getUser';

import { getManyCartsFromResponse } from './getCart';

import type { Cart, CartResponse } from './getCart';

const getUserCarts = async (userId: User['id']): Promise<Cart[]> => {
    const { data: cartResponses = [] } = await fakeStoreApi.get<
        CartResponse[] | undefined
    >(`carts/user/${userId}`);

    const carts = await getManyCartsFromResponse(cartResponses);

    return carts;
};

export default getUserCarts;
