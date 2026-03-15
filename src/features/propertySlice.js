import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchProperties = createAsyncThunk('properties/fetchProperties',
    async () => {
        const response = await axios.get('/data/properties.json')
        return response.data.properties


    }
)
const initialState = {
    properties: [],
    loading: false,
    error: null,
    search: [],
   

}

const propertySlice = createSlice({
    name: "properties",
    initialState,
    reducers: {
         searchProperty:(state,action) =>{
            state.search = action.payload

        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProperties.pending, (state) => {
            state.loading = true

        })
            .addCase(fetchProperties.fulfilled, (state, action) => {
                state.properties = action.payload
                state.loading = false
                console.log(state.properties)

            })
            .addCase(fetchProperties.rejected, (state) => {
                state.loading = true
                console.log("Error occurred");
            })

    }
})


export const {searchProperty} = propertySlice.actions
export default propertySlice.reducer


