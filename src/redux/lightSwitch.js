import { createSlice } from "@reduxjs/toolkit";

export const lightSwitchSlice = createSlice({
    name: "light switch",
    initialState: {
        value: true
    },
    reducers: {
        switchLight: state => {
            return !state.value;
        }
    }
})

export default lightSwitchSlice.reducer;
export const {switchLight} = lightSwitchSlice.actions;