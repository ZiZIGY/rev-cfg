import {
  ConfigEntity,
  ConfigSection,
  ConfigSectionGroup,
  ConfigSlice,
} from "../@types";
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
      const createdSection: ConfigSection = createSection(state);
      if (action.payload) {
        findRecursive(action.payload, state.sections, (item: ConfigSection) => {
          item.children.push(createdSection);
        });
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
    changeVisibility: (state, action: { payload: number }) => {
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
    changeLabel: (
      state,
      action: { payload: { id: number; label: string } }
    ) => {
      findRecursive(
        action.payload.id,
        state.sections,
        (item: ConfigEntity<unknown>) => {
          if (item.frontId === action.payload.id) {
            item.label = action.payload.label;
          }
        }
      );
    },
    changeMultiple: (state, action: { payload: number }) => {
      findRecursive(
        action.payload,
        state.sections,
        (item: ConfigEntity<unknown>) => {
          item.multiple = !item.multiple;
        }
      );
    },
  },
});

export const {
  addSection,
  clearSections,
  changeOrder,
  changeVisibility,
  deleteItem,
  changeMultiple,
  changeLabel,
} = configSlice.actions;

export default configSlice.reducer;
