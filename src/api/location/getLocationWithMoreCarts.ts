import { getCartProducts } from '../cart/getCart';
import type {
    CartProduct,
    CartProductResponse,
    CartResponse
} from '../cart/getCart';

import { getUserCartResponses } from '../cart/getUserCarts';

import getAllUsers from '../user/getAllUsers';
import type { User } from '../user/getUser';

interface LocationCartHistory {
    carts: CartResponse[];
    geolocationId: string;
}

export interface LocationWithMoreCarts {
    geolocationId: string;
    totalCarts: number;
    totalProducts: number;
    products: CartProduct[];
}

const getGeolocationId = (
    geolocation: User['address']['geolocation']
): string => {
    const { lat, long } = geolocation;

    return `${lat},${long}`;
};

const getLocationWithMoreCarts = async (): Promise<LocationWithMoreCarts> => {
    const users = await getAllUsers();

    const usersWithCarts = await Promise.all(
        users.map(async (user) => {
            const carts = await getUserCartResponses(user.id);
            return {
                ...user,
                carts
            };
        })
    );

    const locationCartHistories = usersWithCarts.reduce(
        (accumulator: LocationCartHistory[], user) => {
            const newGeolocationId = getGeolocationId(user.address.geolocation);

            const locationIndex = accumulator.findIndex(
                (locationCartHistory) =>
                    locationCartHistory.geolocationId === newGeolocationId
            );

            if (locationIndex > -1) {
                accumulator[locationIndex].carts.push(...user.carts);
            } else {
                accumulator.push({
                    geolocationId: newGeolocationId,
                    carts: user.carts
                });
            }

            return accumulator;
        },
        []
    );

    const locationWithMoreCarts = locationCartHistories.reduce(
        (locationWithMoreCarts, currentLocation) => {
            const currenthasMoreCarts =
                currentLocation.carts.length >
                locationWithMoreCarts.carts.length;

            return currenthasMoreCarts
                ? currentLocation
                : locationWithMoreCarts;
        },
        locationCartHistories[0]
    );

    const productResponses = locationWithMoreCarts.carts
        .flatMap((cart) => cart.products)
        .reduce(
            (accumulator: CartProductResponse[], currentProductResponse) => {
                const productIndex = accumulator.findIndex(
                    (productResponse) =>
                        productResponse.productId ===
                        currentProductResponse.productId
                );

                if (productIndex > -1) {
                    accumulator[productIndex].quantity +=
                        currentProductResponse.quantity;
                } else {
                    accumulator.push(currentProductResponse);
                }

                return accumulator;
            },
            []
        );

    const products = await getCartProducts(productResponses);

    const totalProducts = products.reduce(
        (accumulator, currentProduct) => accumulator + currentProduct.quantity,
        0
    );

    const totalCarts = locationWithMoreCarts.carts.length;

    return {
        geolocationId: locationWithMoreCarts.geolocationId,
        totalCarts,
        totalProducts,
        products
    };
};

export default getLocationWithMoreCarts;
