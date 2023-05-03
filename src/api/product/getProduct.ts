import { fakeStoreApi } from '..';

interface Rating {
    rate: number;
    count: number;
}

export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: Rating;
}

const getProduct = async (productId: number): Promise<Product | null> => {
    try {
        const { data: product } = await fakeStoreApi.get<Product | undefined>(
            `products/${productId}`
        );

        return product?.id != null ? product : null;
    } catch (error) {
        return null;
    }
};

export default getProduct;
