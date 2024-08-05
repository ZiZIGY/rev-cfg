import areaReducer from "./areaSlice";
import configReducer from "./configSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    config: configReducer,
    // buffer: bufferReducer,
    area: areaReducer,
  },
});
