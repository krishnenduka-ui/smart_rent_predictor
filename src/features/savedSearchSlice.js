import { createSlice } from "@reduxjs/toolkit";

const savedSearchSlice = createSlice({
  name: "savedSearches",
  initialState: { searches: JSON.parse(localStorage.getItem("savedSearches")) || [] },
  reducers: {
    addSavedSearch: (state, action) => {
      const exists = state.searches.find(s => s.userId === action.payload.userId && s.property.id === action.payload.property.id);
      if (!exists) {
        state.searches.push(action.payload);
        localStorage.setItem("savedSearches", JSON.stringify(state.searches));
      }
    },
    removeSavedSearch: (state, action) => {
      state.searches = state.searches.filter(s => s.id !== action.payload);
      localStorage.setItem("savedSearches", JSON.stringify(state.searches));
    }
  }
});

export const { addSavedSearch, removeSavedSearch } = savedSearchSlice.actions;
export default savedSearchSlice.reducer;