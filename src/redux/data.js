import { createSlice } from "@reduxjs/toolkit";
import data from "../data.json";

export const dataSlice = createSlice({
  name: "data",
  initialState: {
    value: data,
  },
  reducers: {
    addInvoice: (state, action) => {
      state.value = [...state.value, action.payload.invoiceToAdd];
    },
    updateInvoice: (state, action) => {
      const id = action.payload.updatedInvoice.id;
      state.value = [
        ...state.value.map((invoice) => {
          if (invoice.id === id) {
            return action.payload.updatedInvoice;
          }
          return invoice;
        }),
      ];
    },
    updateInvoiceStatus: (state, action) => {
      state.value = [
        ...state.value.map((invoice) => {
          if (invoice.id === action.payload.id) {
            invoice.status = "paid";
          }
          return invoice;
        }),
      ];
    },
    deleteInvoice: (state, action) => {
      const id = action.payload.id;
      state.value = [
        ...state.value.filter((invoice) => {
          return invoice.id !== id;
        }),
      ];
    },
  },
});

export default dataSlice.reducer;
export const { addInvoice, updateInvoice, updateInvoiceStatus, deleteInvoice } =
  dataSlice.actions;
