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
    favorites: []

}

const propertySlice = createSlice({
    name: "properties",
    initialState,
    reducers: {
        addFavorite: (state, action) => {
            const exists = state.favorites.find(
                (property) => property.id === action.payload.id
            )

            if (!exists) {
                state.favorites.push(action.payload);
            }
        },
        removeFavorite: (state, action) => {
            state.favorites = state.favorites.filter((property) => 
                property.id !== action.payload.id
            );
        }


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


export const { addFavorite ,removeFavorite} = propertySlice.actions
export default propertySlice.reducer


