import { createSlice } from "@reduxjs/toolkit";

export const screenDimensionsSlice = createSlice({
  name: "screen dimensions",
  initialState: {
    value: {
      width: window.innerWidth,
      height: window.innerHeight,
    },
  },
  reducers: {
    updateDimensions: (state) => {
      state.value = {
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
  },
});

export default screenDimensionsSlice.reducer;
export const { updateDimensions } = screenDimensionsSlice.actions;
