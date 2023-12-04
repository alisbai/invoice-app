import { configureStore } from "@reduxjs/toolkit";
import lightSwitchReducer from "./lightSwitch";
import screenDimensionsReducer from "./screenDimensions";
import drawerReducer from "./drawer";
import dataReducer from "./data";
import modalReducer from "./modal";
import popupReducer from "./popup";
import drawerContentReducer from "./drawerContent";

export default configureStore({
  reducer: {
    lightSwitch: lightSwitchReducer,
    screenDimensions: screenDimensionsReducer,
    drawer: drawerReducer,
    data: dataReducer,
    modal: modalReducer,
    popup: popupReducer,
    drawerContent: drawerContentReducer,
  },
});
