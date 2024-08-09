import { AreaSlice } from "../@types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: AreaSlice = {
  componentsIds: [],
};

export const areaSlice = createSlice({
  name: "active-area",
  initialState: initialState,
  reducers: {
    toggleComponent: (state, action: { payload: number }) => {
      if (state.componentsIds.includes(action.payload)) {
        state.componentsIds = state.componentsIds.filter(
          (id) => id !== action.payload
        );
      } else state.componentsIds.push(action.payload);
    },
    clearArea: (state) => {
      state.componentsIds = [];
    },
  },
});

export const { toggleComponent, clearArea } = areaSlice.actions;

export default areaSlice.reducer;
