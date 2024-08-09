import {
  ConfigEntity,
  ConfigItemValue,
  ConfigList,
  ConfigSection,
  ConfigSectionGroup,
  ConfigSelect,
  ConfigSlice,
  Modals,
  Picture,
} from "../@types";
import {
  createList,
  createSection,
  createTableItem,
  findRecursive,
  sortItems,
} from "../lib";

import { createSlice } from "@reduxjs/toolkit";

const initialState: ConfigSlice = {
  openedSections: [],
  currentFrontId: 1,
  sections: [],
  pictures: [],
  modals: {
    img: {
      isOpen: false,
      element: 0,
    },
  },
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
    toggleModal: (
      state,
      action: {
        payload: { type: keyof Modals; isOpen: boolean; element: number };
      }
    ) => {
      state.modals[action.payload.type].isOpen = action.payload.isOpen;
      state.modals[action.payload.type].element = action.payload.element;
    },
    toggleSection: (state, action: { payload: number }) => {
      state.openedSections.includes(action.payload)
        ? (state.openedSections = state.openedSections.filter(
            (id) => id !== action.payload
          ))
        : state.openedSections.push(action.payload);
    },
    changeImage: (
      state,
      action: {
        payload: {
          id: number;
          picture: number;
        };
      }
    ) => {
      findRecursive(
        ["frontId", action.payload.id],
        state.sections,
        (item: ConfigItemValue) => {
          item.picture = action.payload.picture;
          console.log(item.picture);
        }
      );
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
    addTableItem: (state, action: { payload: number }) => {
      const createdTableItem = createTableItem(state);
      findRecursive(
        ["frontId", action.payload],
        state.sections,
        (item: ConfigList | ConfigSelect) => {
          item.children.push(createdTableItem);
        }
      );
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
    reorder: (state, action: { payload: number | undefined }) => {
      if (action.payload) {
        findRecursive(
          ["frontId", action.payload],
          state.sections,
          (item: ConfigSection | ConfigSectionGroup) => {
            item.children.sort((a, b) => sortItems(a, b));
          }
        );
      } else {
        state.sections.sort((a, b) => sortItems(a, b));
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
    addPictures: (state, action: { payload: Picture[] }) => {
      state.pictures = action.payload;
    },
  },
});

export const {
  changeImage,
  addSection,
  addPictures,
  addList,
  clearSections,
  addTableItem,
  changeOrder,
  toggleModal,
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
