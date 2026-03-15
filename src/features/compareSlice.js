// features/compare/compareSlice.js
import { createSlice } from '@reduxjs/toolkit';

const compareSlice = createSlice({
  name: 'compare',
  initialState: {
    selectedProperties: [], // Stores 2-3 property objects
  },
  reducers: {
    addToCompare: (state, action) => {
      if (state.selectedProperties.length < 3) {
        state.selectedProperties.push(action.payload);
      }
    },
    removeFromCompare: (state, action) => {
      state.selectedProperties = state.selectedProperties.filter(
        (p) => p.id !== action.payload
      );
    },
  },
});

export const { addToCompare, removeFromCompare } = compareSlice.actions;
export default compareSlice.reducer;
