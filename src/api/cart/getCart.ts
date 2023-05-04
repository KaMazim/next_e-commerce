import { fakeStoreApi } from '..';

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

export interface CartProductResponse {
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

export const getCartFromResponse = async (
    cartResponse: CartResponse
): Promise<Cart> => {
    const { id, userId, date } = cartResponse;

    const cartProducts = await getCartProducts(cartResponse.products);

    const cart: Cart = {
        id,
        userId,
        date: new Date(date),
        products: cartProducts
    };

    return cart;
};

export const getManyCartsFromResponse = async (
    cartResponses: CartResponse[]
): Promise<Cart[]> => {
    const carts: Cart[] = await Promise.all(
        cartResponses.map(async (cartResponse) => {
            const cart = await getCartFromResponse(cartResponse);
            return cart;
        })
    );

    return carts;
};

const getCart = async (cartId: number): Promise<Cart | null> => {
    try {
        const { data: cartResponse } = await fakeStoreApi.get<CartResponse>(
            `carts/${cartId}`
        );

        const cart = await getCartFromResponse(cartResponse);

        return cart;
    } catch (error) {
        return null;
    }
};

export default getCart;
