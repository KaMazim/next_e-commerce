import getUser from './getUser';
import type { User } from './getUser';

import type { Cart } from '../cart/getCart';

import getAllCarts from '../cart/getAllCarts';

export interface UserCartHistory extends Pick<User, 'id' | 'email' | 'name'> {
    carts: Cart[];
}

const getUserCartHistory = async (
    userId: User['id']
): Promise<UserCartHistory | null> => {
    const user = await getUser(userId);

    if (user != null) {
        const { id, email, name } = user;

        const carts = await getAllCarts();
        const userCarts = carts.filter((cart) => cart.userId === id);

        return {
            id,
            email,
            name,
            carts: userCarts
        };
    } else return null;
};

export default getUserCartHistory;
