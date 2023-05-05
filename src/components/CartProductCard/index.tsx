import React from 'react';

import type { CartProduct } from '@/api/cart/getCart';

interface CartProductCardProps {
    product: CartProduct;
}

const CartProductCard: React.FC<CartProductCardProps> = ({ product }) => {
    return (
        <div>
            <h4>{product.title}</h4>
            <p>{product.description}</p>
            <p>
                <b>Quantity: </b>
                {product.quantity}
            </p>
            <p>
                <b>Price: </b>
                {product.price}
            </p>
            <p>
                <b>Total: </b>
                {product.price * product.quantity}
            </p>
        </div>
    );
};

export default CartProductCard;
