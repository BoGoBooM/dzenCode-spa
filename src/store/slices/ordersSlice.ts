import { createSlice, type PayloadAction,  } from '@reduxjs/toolkit';
import { orders } from '../../data/mockData';
import type { Order } from '../../types';

interface OrdersState {
  items: Order[];
  selectedOrder: Order | null;
}

const initialState: OrdersState = {
  items: orders,
  selectedOrder: null,
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    selectOrder(state, action: PayloadAction<number>) {
      const found = state.items.find((order) => order.id === action.payload);
      state.selectedOrder = found ?? null;
    },
    deselectOrder(state) {
      state.selectedOrder = null;
    },
    deleteOrder(state, action: PayloadAction<number>) {
      state.items = state.items.filter(order => order.id !== action.payload);

      if (state.selectedOrder?.id === action.payload) {
        state.selectedOrder = null;
      }
    },
  },
});

export const { selectOrder, deselectOrder, deleteOrder } = ordersSlice.actions;
export default ordersSlice.reducer;
