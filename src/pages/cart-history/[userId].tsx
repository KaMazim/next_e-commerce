import React from 'react';

import type { GetServerSideProps } from 'next';

import getUserCartHistory, {
    type UserCartHistory
} from '@/api/user/getUserCartHistory';
import CartProductCard from '@/components/CartProductCard';

interface CartHistoryProps {
    userCartHistory: UserCartHistory;
}

export const getServerSideProps: GetServerSideProps<CartHistoryProps> = async ({
    query
}) => {
    const { userId } = query;

    const userCartHistory = await getUserCartHistory(Number(userId));

    if (userCartHistory === null) return { notFound: true };

    return { props: { userCartHistory } };
};

const CartHistory: React.FC<CartHistoryProps> = ({ userCartHistory }) => {
    const {
        name: { firstname, lastname },
        email,
        carts
    } = userCartHistory;

    return (
        <div>
            <h2>Cart History</h2>
            <p>
                <b>User:</b> {firstname + ' ' + lastname}
            </p>
            <p>
                <b>
                    Email: <a href={`mailto:${email}`}>{email}</a>
                </b>
            </p>

            <h3>Carts</h3>
            <ul>
                {carts.map((cart, index) => {
                    const cartTotal = cart.products
                        .map((product) => product.price * product.quantity)
                        .reduce(
                            (cartTotal, productTotal) =>
                                cartTotal + productTotal
                        );

                    return (
                        <li key={cart.id}>
                            <b>
                                Cart {index + 1} - Total: {cartTotal}
                            </b>
                            <br />
                            <br />
                            Products:{' '}
                            <ul>
                                {cart.products.map((product) => (
                                    <CartProductCard
                                        key={product.id}
                                        product={product}
                                    />
                                ))}
                            </ul>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default CartHistory;
