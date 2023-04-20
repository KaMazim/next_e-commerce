import api from '.';

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
    const { data: product } = await api.get<Product | undefined>(
        `products/${productId}`
    );

    return product?.id != null ? product : null;
};

export default getProduct;
