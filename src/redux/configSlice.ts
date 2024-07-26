import { ConfigEntity, ConfigSlice } from "../@types";
import { createSection, findRecursive } from "../lib";

import { createSlice } from "@reduxjs/toolkit";

const initialState: ConfigSlice = {
  currentFrontId: 1,
  sections: [],
};

export const configSlice = createSlice({
  name: "config",
  initialState: initialState,
  reducers: {
    addSection: (state, action: { payload: number | undefined }) => {
      const createdSection = createSection(state);
      if (action.payload) {
      } else {
        state.sections.push(createdSection);
      }
    },
    clearSections: (state) => {
      state.sections = [];
    },
    changeOrder: (state, action) => {
      state.sections = action.payload;
    },
    changeVisibility: (state, action) => {
      findRecursive(
        action.payload,
        state.sections,
        (item: ConfigEntity<unknown>) => {
          item.show = !item.show;
        }
      );
    },
    deleteItem: (state, action) => {
      findRecursive(action.payload, state.sections, "delete");
    },
  },
});

export const {
  addSection,
  clearSections,
  changeOrder,
  changeVisibility,
  deleteItem,
} = configSlice.actions;

export default configSlice.reducer;
