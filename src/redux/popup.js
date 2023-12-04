import { createSlice } from "@reduxjs/toolkit";

export const popupSlice = createSlice({
  name: "popup",
  initialState: {
    value: false,
  },
  reducers: {
    showPopup: (state) => {
      state.value = true;
    },
    hidePopup: (state) => {
      state.value = false;
    },
  },
});

export default popupSlice.reducer;

export const { showPopup, hidePopup } = popupSlice.actions;
