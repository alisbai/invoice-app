import { configureStore } from "@reduxjs/toolkit";
import lightSwitchReducer from "./lightSwitch";
import screenDimensionsReducer from "./screenDimensions";

export default configureStore({
    reducer: {
        lightSwitch: lightSwitchReducer,
        screenDimensions: screenDimensionsReducer
    }
})