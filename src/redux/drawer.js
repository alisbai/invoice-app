import { createSlice } from "@reduxjs/toolkit";

export const drawerSlice = createSlice({
    name: "drawer",
    initialState: {
        value: false
    },
    reducers: {
        toggleDrawer: state => {
            state.value = !state.value;
        }
    }
})

export default drawerSlice.reducer;
export const {toggleDrawer} = drawerSlice.actions;