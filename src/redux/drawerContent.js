import { createSlice } from "@reduxjs/toolkit";

export const drawerContentSlice = createSlice({
  name: "drawer content",
  initialState: {
    value: "newInvoice",
  },
  reducers: {
    updateDrawerContent: (state, action) => {
      state.value = action.payload.drawerType;
    },
  },
});

export default drawerContentSlice.reducer;
export const { updateDrawerContent } = drawerContentSlice.actions;
