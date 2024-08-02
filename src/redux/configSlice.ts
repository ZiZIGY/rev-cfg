import {
  ConfigEntity,
  ConfigSection,
  ConfigSectionGroup,
  ConfigSlice,
} from "../@types";
import { createList, createSection, findRecursive, sortItems } from "../lib";

import { createSlice } from "@reduxjs/toolkit";

const initialState: ConfigSlice = {
  openedSections: [],
  currentFrontId: 1,
  sections: [],
};

export const configSlice = createSlice({
  name: "config",
  initialState: initialState,
  reducers: {
    addList: (state, action: { payload: number | undefined }) => {
      const createdList = createList(state);
      findRecursive(
        ["frontId", action.payload],
        state.sections,
        (item: ConfigSection | ConfigSectionGroup) => {
          item.children.push(createdList);
        }
      );
    },
    toggleSection: (state, action: { payload: number }) => {
      state.openedSections.includes(action.payload)
        ? (state.openedSections = state.openedSections.filter(
            (id) => id !== action.payload
          ))
        : state.openedSections.push(action.payload);
    },
    addSection: (state, action: { payload: number | undefined }) => {
      const createdSection = createSection(state) as ConfigSection;
      if (action.payload) {
        findRecursive(
          ["frontId", action.payload],
          state.sections,
          (item: ConfigSection) => {
            item.children.push(createdSection);
          }
        );
      } else {
        state.sections.push(createdSection);
      }
    },
    addSectionGroup: (state, action: { payload: number | undefined }) => {
      const createdSectionGroup = createSection(
        state,
        true
      ) as ConfigSectionGroup;
      if (action.payload) {
        findRecursive(
          ["frontId", action.payload],
          state.sections,
          (item: ConfigSection | ConfigSectionGroup) => {
            item.children.push(createdSectionGroup);
          }
        );
      }
    },
    clearSections: (state, action: { payload: number | undefined }) => {
      if (action.payload) {
        findRecursive(
          ["frontId", action.payload],
          state.sections,
          (section: ConfigSection | ConfigSectionGroup) => {
            section.children = [];
          }
        );
      } else {
        state.sections = [];
      }
    },
    changeOrder: (state, action: { payload: { id: number; sort: number } }) => {
      findRecursive(
        ["frontId", action.payload.id],
        state.sections,
        (item: ConfigSection | ConfigSectionGroup) => {
          item.sort = action.payload.sort;
        }
      );
    },
    reorder: (
      state,
      action: { payload: { id: number | undefined; sort: "asc" | "desc" } }
    ) => {
      if (action.payload.id) {
        findRecursive(
          ["frontId", action.payload.id],
          state.sections,
          (item: ConfigSection | ConfigSectionGroup) => {
            item.children.sort((a, b) => sortItems(a, b, action.payload.sort));
          }
        );
      } else {
        state.sections.sort((a, b) => sortItems(a, b, action.payload.sort));
      }
    },
    changeVisibility: (state, action: { payload: number }) => {
      findRecursive(
        ["frontId", action.payload],
        state.sections,
        (item: ConfigEntity<unknown>) => {
          item.show = !item.show;
        }
      );
    },
    deleteItem: (state, action: { payload: number }) => {
      findRecursive(["frontId", action.payload], state.sections, "delete");
    },
    changeLabel: (
      state,
      action: { payload: { id: number; label: string } }
    ) => {
      findRecursive(
        ["frontId", action.payload.id],
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
        ["frontId", action.payload],
        state.sections,
        (item: ConfigSection | ConfigSectionGroup) => {
          item.multiple = !item.multiple;
        }
      );
    },
    findSectionByFilter: (state, action: { payload: string }) => {
      const parents = findRecursive(["label", action.payload], state.sections);

      state.openedSections = parents.map((item) => item.frontId);
    },
  },
});

export const {
  addSection,
  addList,
  clearSections,
  changeOrder,
  findSectionByFilter,
  changeVisibility,
  deleteItem,
  toggleSection,
  addSectionGroup,
  changeMultiple,
  changeLabel,
  reorder,
} = configSlice.actions;

export default configSlice.reducer;
