import getProduct from './getProduct';

import type { Product } from './getProduct';

const getManyProducts = async (productIds: number[]): Promise<Product[]> => {
    const products: Product[] = [];

    for (const id of productIds) {
        const product = await getProduct(id);

        if (product != null) products.push(product);
    }

    return products;
};

export default getManyProducts;
