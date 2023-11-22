import { createSlice } from "@reduxjs/toolkit";
import data from "../data.json"

export const dataSlice = createSlice({
    name: "data",
    initialState: {
        value: data
    },
    reducers: {
        addInvoice: (state, action) => {
            state.value = [...state.value, action.payload.invoiceToAdd];
            console.log(state.value);
        }
    }
})

export default dataSlice.reducer;
export const {addInvoice} = dataSlice.actions;