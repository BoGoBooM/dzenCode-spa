import { products } from '../data/mockData';
import type { Product } from '../types';

interface FetchProductsResponse {
  items: Product[];
  hasMore: boolean;
}

export function fetchProducts(page = 1, limit = 6): Promise<FetchProductsResponse> {
  return new Promise((resolve) => {
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedItems = products.slice(start, end);
    const hasMore = end < products.length;

    setTimeout(() => {
      resolve({ items: paginatedItems, hasMore });
    }, 500);
  });
}
