import { createSlice } from "@reduxjs/toolkit";

const currentUser = JSON.parse(localStorage.getItem("currentUser"));

const initialState = {
  user: currentUser || null,
  isAuthenticated: currentUser ? true : false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signup: (state, action) => {
      const users = JSON.parse(localStorage.getItem("users")) || [];

      users.push(action.payload);

      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("currentUser", JSON.stringify(action.payload));

      state.user = action.payload;
      state.isAuthenticated = true;
    },

    login: (state, action) => {
      const users = JSON.parse(localStorage.getItem("users")) || [];

      const foundUser = users.find(
        (user) =>
          user.email === action.payload.email &&
          user.password === action.payload.password
      );

      if (foundUser) {
        localStorage.setItem("currentUser", JSON.stringify(foundUser));

        state.user = foundUser;
        state.isAuthenticated = true;
      } else {
        alert("Invalid credentials");
      }
    },

    logout: (state) => {
      localStorage.removeItem("currentUser");

      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { signup, login, logout } = authSlice.actions;

export default authSlice.reducer;