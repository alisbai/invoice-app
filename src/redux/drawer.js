import { createSlice } from "@reduxjs/toolkit";

export const drawerSlice = createSlice({
  name: "drawer",
  initialState: {
    value: false,
  },
  reducers: {
    openDrawer: (state) => {
      state.value = true;
    },
    closeDrawer: (state) => {
      state.value = false;
    },
  },
});

export default drawerSlice.reducer;
export const { openDrawer, closeDrawer } = drawerSlice.actions;
