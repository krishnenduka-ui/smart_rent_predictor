import { createSlice } from "@reduxjs/toolkit";

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
      const existingUser = state.users.find((user)=>{
                                                    user.email === email
                                            })

        if(existingUser){
          return alert("Email already exist")
        }
        state.users.push({id:Date.now(),...action.payload})
        localStorage.setItem('users',JSON.stringify(state.users))
        alert("User Registered Successfully")
     
    },

    login: (state, action) => {
      
      const {email,password} = action.payload
      const foundUser = state.users.find((user) =>{
                                           return  user.email === email 
                                            })

      if (!foundUser) {
                      return alert("No user with this email")
                      }
      
      if(foundUser.password != password){
        return alert("Invalid credentials")

      }
      state.loggedinUser = foundUser
      localStorage.setItem("currentUser", JSON.stringify(foundUser));
      alert("LoggedIn Successfull");
      
    },

    logout: (state) => {
      localStorage.removeItem("currentUser");
      state.loggedinUser = null;
    },
  },
});

export const { signup, login, logout } = authSlice.actions;

export default authSlice.reducer;