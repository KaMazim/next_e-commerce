import api from '..';

import getManyProducts from '../product/getManyProducts';

import type { Product } from '../product/getProduct';

export interface CartProduct extends Product {
    quantity: number;
}

export interface Cart {
    id: number;
    userId: number;
    date: Date;
    products: CartProduct[];
}

interface CartProductResponse {
    productId: number;
    quantity: number;
}

export interface CartResponse {
    id: number;
    userId: number;
    date: string;
    products: CartProductResponse[];
}

export const getCartProducts = async (
    productResponses: CartProductResponse[]
): Promise<CartProduct[]> => {
    const productIds = productResponses.map(({ productId }) => productId);
    const products = await getManyProducts(productIds);

    const cartProducts: CartProduct[] = products.map((product) => {
        const index = productResponses.findIndex(
            ({ productId }) => productId === product.id
        );

        const { quantity } = productResponses[index];

        return { ...product, quantity };
    });

    return cartProducts;
};

const getCart = async (cartId: number): Promise<Cart | null> => {
    const { data: response } = await api.get<CartResponse | undefined>(
        `carts/${cartId}`
    );

    if (response?.id != null) {
        const { id, userId, date } = response;

        const cartProducts = await getCartProducts(response.products);

        const cart: Cart = {
            id,
            userId,
            date: new Date(date),
            products: cartProducts
        };

        return cart;
    }

    return null;
};

export default getCart;
