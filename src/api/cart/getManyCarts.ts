import getCart from './getCart';

import type { Cart } from './getCart';

const getManyCarts = async (cartIds: number[]): Promise<Cart[]> => {
    const carts: Cart[] = [];

    for (const id of cartIds) {
        const cart = await getCart(id);

        if (cart != null) carts.push(cart);
    }

    return carts;
};

export default getManyCarts;
