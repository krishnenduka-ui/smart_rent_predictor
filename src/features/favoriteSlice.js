import { createSlice } from "@reduxjs/toolkit";

const getUserFavorites = () => {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  if (!user) return [];

  const favorites = JSON.parse(
    localStorage.getItem(`favorites_${user.email}`)
  );

  return favorites || [];
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    favorites: getUserFavorites()
  },

  reducers: {
    addFavorite: (state, action) => {
      const user = JSON.parse(localStorage.getItem("currentUser"));

      const exists = state.favorites.find(
        (item) => item.id === action.payload.id
      );

      if (!exists) {
        state.favorites.push(action.payload);

        localStorage.setItem(
          `favorites_${user.email}`,
          JSON.stringify(state.favorites)
        );
      }
    },

    removeFavorite: (state, action) => {
      const user = JSON.parse(localStorage.getItem("currentUser"));

      state.favorites = state.favorites.filter(
        (item) => item.id !== action.payload.id
      );

      localStorage.setItem(`favorites_${user.email}`,JSON.stringify(state.favorites)
      );
    },

    
  }
});

export const { addFavorite, removeFavorite} = favoritesSlice.actions;
export default favoritesSlice.reducer;