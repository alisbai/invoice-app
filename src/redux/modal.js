import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
  name: "modal",
  initialState: {
    value: false,
  },
  reducers: {
    showModal: (state) => {
      state.value = true;
      console.log(state.value);
    },
    hideModal: (state) => {
      state.value = false;
    },
  },
});

export default modalSlice.reducer;

export const { showModal, hideModal } = modalSlice.actions;
