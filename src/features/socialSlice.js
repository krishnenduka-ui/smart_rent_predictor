import { createSlice } from "@reduxjs/toolkit";
const initialState =({
  social : [{ facebook: "https://facebook.com"},
    {twitter: "https://twitter.com"},
    {instagram: "https://instagram.com"},
    {linkedin: "https://linkedin.com"},
   ]
})

const socialSlice = createSlice({
  name: "social",
  initialState ,
  reducers: {}
});

export default socialSlice.reducer;