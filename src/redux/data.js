import { createSlice } from "@reduxjs/toolkit";
import data from "../data.json"

export const dataSlice = createSlice({
    name: "data",
    initialState: {
        value:data
    },
    reducers: {
        addInvoice: (state, invoiceToAdd) => {
            state.value = [...state, invoiceToAdd];
        }
    }
})

export default dataSlice.reducer;
export const {addInvoice} = dataSlice.actions;