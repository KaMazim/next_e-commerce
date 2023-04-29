import api from '..';

import { getCartProducts } from './getCart';

import type { Cart, CartResponse } from './getCart';

const getAllCarts = async (): Promise<Cart[]> => {
    const { data: responseCarts = [] } = await api.get<
        CartResponse[] | undefined
    >(`carts`);

    const carts: Cart[] = await Promise.all(
        responseCarts.map(async (responseCart) => {
            const products = await getCartProducts(responseCart.products);

            return {
                ...responseCart,
                products,
                date: new Date(responseCart.date)
            };
        })
    );

    return carts;
};

export default getAllCarts;
