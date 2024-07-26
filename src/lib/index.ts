import {
  ConfigEntityType,
  ConfigSection,
  ConfigSectionGroup,
  ConfigSlice,
  RecursiveActions,
} from "../@types";

export const findRecursive = (
  frontendId: number,
  array: ConfigSection[] | ConfigSectionGroup[],
  callback: Function | RecursiveActions
) => {
  array.some((element, index) => {
    if (element.frontId === frontendId) {
      if (typeof callback === "function") {
        callback(element);
      }

      if (callback === "delete") {
        array.splice(index, 1);
      }
      return true;
    }
    if (element.children) {
      findRecursive(
        frontendId,
        element.children as unknown as ConfigSection[] | ConfigSectionGroup[],
        callback
      );
    }
  });
};

export const createSection = (state: ConfigSlice) => {
  const section: ConfigSection = {
    frontId: state.currentFrontId++,
    label: "",
    children: [],
    show: true,
    multiple: false,
    type: ConfigEntityType.Section,
  };
  return section;
};

export const createSectionGroup = (
  state: ConfigSlice,
  section: ConfigSection | ConfigSectionGroup
) => {
  return {
    children: [],
    frontId: state.currentFrontId++,
    label: "",
    show: true,
    multiple: false,
    type: ConfigEntityType.SectionGroup,
  } as ConfigSectionGroup;
};
