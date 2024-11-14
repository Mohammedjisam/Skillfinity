import { createSlice } from '@reduxjs/toolkit';
import axiosInstance from '@/AxiosConfig';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    count: 0,
  },
  reducers: {
    setCartItems: (state, action) => {
      state.items = action.payload;
    },
    updateCartCount: (state, action) => {
      state.count = action.payload;
    },
  },
});

export const { setCartItems, updateCartCount } = cartSlice.actions;

export const fetchCartCount = (userId) => async (dispatch) => {
  try {
    const response = await axiosInstance.post(`/user/data/cartcount/${userId}`);
    dispatch(updateCartCount(response.data.totalItems));
  } catch (error) {
    console.error('Error fetching cart count:', error);
  }
};

export default cartSlice.reducer;