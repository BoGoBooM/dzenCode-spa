import { createSlice, type PayloadAction,  } from '@reduxjs/toolkit';
import { products } from '../../data/mockData';
import type { Product } from '../../types';

interface ProductsState {
  items: Product[];
}

const initialState: ProductsState = {
  items: products,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      state.items.push(action.payload);
    },
  },
});

export const { addProduct } = productsSlice.actions;
export default productsSlice.reducer;
