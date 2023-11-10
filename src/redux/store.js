import { configureStore } from "@reduxjs/toolkit";
import lightSwitchReducer from "./lightSwitch";
import screenDimensionsReducer from "./screenDimensions";
import drawerReducer from "./drawer";
import dataReducer from "./data";

export default configureStore({
    reducer: {
        lightSwitch: lightSwitchReducer,
        screenDimensions: screenDimensionsReducer,
        drawer:  drawerReducer,
        data: dataReducer
    }
})
