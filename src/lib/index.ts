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
      findRecursive(frontendId, element.children, callback);
    }
  });
};

export const createSection = (state: ConfigSlice) => {
  return {
    frontId: state.currentFrontId++,
    label: `Секция ${state.currentFrontId}`,
    children: [],
    show: true,
    type: ConfigEntityType.Section,
  } as ConfigSection;
};
