import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    center: [9.9312, 76.2673], // Kochi
    zoom: 13,
    markers: []
}
const mapSlice = createSlice({
    name: "map",
    initialState,
    reducers: {
        addMarker: (state, action) => {
            state.markers.push(action.payload);
        }
    }
});

export const { addMarker } = mapSlice.actions;
export default mapSlice.reducer;