import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { trainModel, predictRent } from '../ai/rentModel'

export const trainRentEstimator = createAsyncThunk(
  "rentEstimator/trainRentEstimator",
  async (properties) => {
    await trainModel(properties);
  }
);

export const estimateRent = createAsyncThunk(
  "rentEstimator/estimateRent",
  async (data) => {
    const rent = predictRent(data);
    return rent;
  }
);

const rentEstimatorSlice = createSlice({
  name: "rentEstimator",

  initialState: {
    predictedRent: null,
    loading: false
  },

  reducers: {},

  extraReducers: (builder) => {

    builder
      .addCase(trainRentEstimator.pending, (state) => {
        state.loading = true;
      })

      .addCase(trainRentEstimator.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(estimateRent.fulfilled, (state, action) => {
        state.predictedRent = action.payload;
      });
  }
});

export default rentEstimatorSlice.reducer;