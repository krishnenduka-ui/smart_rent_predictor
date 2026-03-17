import { createSlice } from "@reduxjs/toolkit";

// Load favorites for user from localStorage
const getFavorites = (userId) => {
  const allFavorites = JSON.parse(localStorage.getItem("userfavorites")) || [];
  return allFavorites.filter(f => f.userId === userId).map(f => f.property);
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: { favorites: [] },
  reducers: {
    initializeFavorites: (state, action) => { state.favorites = getFavorites(action.payload); },
    addFavorite: (state, action) => {
      const { userId, property } = action.payload;
      const allFavorites = JSON.parse(localStorage.getItem("userfavorites")) || [];
      const exists = allFavorites.find(item => item.userId === userId && item.property.id === property.id);
      if (!exists) {
        allFavorites.push({ userId, property });
        localStorage.setItem("userfavorites", JSON.stringify(allFavorites));
        state.favorites.push(property);
      }
    },
    removeFavorite: (state, action) => {
      const { userId, propertyId } = action.payload;
      let allFavorites = JSON.parse(localStorage.getItem("userfavorites")) || [];
      allFavorites = allFavorites.filter(item => !(item.userId === userId && item.property.id === propertyId));
      localStorage.setItem("userfavorites", JSON.stringify(allFavorites));
      state.favorites = state.favorites.filter(item => item.id !== propertyId);
    }
  }
});

export const { initializeFavorites, addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;