import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
const storedUsers = JSON.parse(localStorage.getItem('users'))
const currentUser = JSON.parse(localStorage.getItem("currentUser"));

const initialState = {
  users: storedUsers || [],
  loggedinUser: currentUser || null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signup: (state, action) => {

      const {email} = action.payload
      const existingUser = state.users.find((user)=> user.email === email)

        if(existingUser){
          return toast.error("Email already exist")
        }
        state.users.push({id:Date.now(),...action.payload})
        localStorage.setItem('users',JSON.stringify(state.users))
        toast.success("User Registered Successfully")
     
    },

    login: (state, action) => {
      
      const {email,password} = action.payload
      const foundUser = state.users.find((user) =>{
                                           return  user.email === email 
                                            })

      if (!foundUser) {
                      return toast.error("No user with this email")
                      }
      
      if(foundUser.password != password){
        return toast.error("Invalid credentials")

      }
      state.loggedinUser = foundUser
      localStorage.setItem("currentUser", JSON.stringify(foundUser));
      toast.success("Logged In Successfull");
      
    },

    logout: (state) => {
      localStorage.removeItem("currentUser");
      state.loggedinUser = null;
    },
  },
});

export const { signup, login, logout } = authSlice.actions;

export default authSlice.reducer;