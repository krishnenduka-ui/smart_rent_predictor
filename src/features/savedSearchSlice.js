// features/savedSearchSlice.js
import { createSlice } from "@reduxjs/toolkit";

const savedSearchesFromStorage = JSON.parse(localStorage.getItem("savedSearches")) || [];

const savedSearchSlice = createSlice({
  name: "savedSearches",
  initialState: {
    searches: savedSearchesFromStorage, // load from localStorage
  },
  reducers: {
    addSavedSearch: (state, action) => {
      state.searches.push(action.payload);
      localStorage.setItem("savedSearches", JSON.stringify(state.searches)); // persist
    },
    removeSavedSearch: (state, action) => {
      state.searches = state.searches.filter((s) => s.id !== action.payload);
      localStorage.setItem("savedSearches", JSON.stringify(state.searches)); // persist
    },
  },
});

export const { addSavedSearch, removeSavedSearch } = savedSearchSlice.actions;
export default savedSearchSlice.reducer;