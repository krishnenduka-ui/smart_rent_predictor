import { createSlice } from "@reduxjs/toolkit";
const initialState =({
  social : { facebook: "https://www.facebook.com",
    twitter: "https://www.twitter.com",
    instagram: "https://www.instagram.com",
    linkedin: "https://www.linkedin.com"
  }
})

const socialSlice = createSlice({
  name: "social",
  initialState ,
  reducers: {}
});

export default socialSlice.reducer;