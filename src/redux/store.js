import { configureStore } from "@reduxjs/toolkit";
import lightSwitchReducer from "./lightSwitch";

export default configureStore({
    reducer: {
        lightSwitch: lightSwitchReducer
    }
})