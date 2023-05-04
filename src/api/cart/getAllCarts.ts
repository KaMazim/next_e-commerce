import { fakeStoreApi } from '..';

import { getManyCartsFromResponse } from './getCart';

import type { Cart, CartResponse } from './getCart';

const getAllCarts = async (): Promise<Cart[]> => {
    const { data: cartResponses } = await fakeStoreApi.get<CartResponse[]>(
        `carts`
    );

    const carts = await getManyCartsFromResponse(cartResponses);

    return carts;
};

export default getAllCarts;
