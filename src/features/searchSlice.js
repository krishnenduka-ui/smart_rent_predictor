import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    search :[]
}

const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers:{
        searchProperty:(state,action) =>{
            state.search = action.payload

        }
    }

})


export const {searchProperty} = searchSlice.actions 
export default searchSlice.reducer