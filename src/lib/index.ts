import {
  ConfigEntity,
  ConfigItemValue,
  ConfigList,
  PriceTypes,
} from "./../@types/index";
import {
  ConfigEntityType,
  ConfigSection,
  ConfigSectionGroup,
  ConfigSlice,
  RecursiveActions,
} from "../@types";

export const findRecursiveAll = (
  array: ConfigSection[] | ConfigSectionGroup[],
  returnedArray: (ConfigSection | ConfigSectionGroup)[] = []
) => {
  for (let index = 0; index < array.length; index++) {
    const element = array[index];
    returnedArray.push(element);
    if (element.children) {
      findRecursiveAll(element.children, returnedArray);
    }
  }
  return returnedArray;
};

export const findRecursive = (
  values: [keyof ConfigEntity<unknown>, unknown],
  array: ConfigSection[] | ConfigSectionGroup[],
  callback?: CallableFunction | RecursiveActions,
  parents: ConfigEntity<unknown>[] = []
) => {
  const [key, value] = values;

  for (let index = 0; index < array.length; index++) {
    const element = array[index];

    if (parents.length) break;

    if (element[key] === value) {
      parents.push(element);

      if (typeof callback === "function") {
        callback(element);
      }

      if (callback === "delete") {
        array.splice(index, 1);
      }
    }

    if (element.children) {
      const result = findRecursive(
        values,
        element.children as unknown as ConfigSection[] | ConfigSectionGroup[],
        callback,
        parents
      );

      if (result.length) {
        parents.push(element);
      }
    }
  }

  const parentsMap = new Map(
    parents.map((parent) => [parent["frontId"], parent])
  ).values();

  parents = Array.from(parentsMap);

  return parents;
};

export const createSection = (state: ConfigSlice, group?: boolean) => {
  const section = {
    frontId: state.currentFrontId++,
    label: "",
    children: [],
    show: true,
    sort: 0,
    multiple: false,
    type: ConfigEntityType[group ? "SectionGroup" : "Section"],
  };
  return section as ConfigSection | ConfigSectionGroup;
};

export const createSectionGroup = (state: ConfigSlice) => {
  const sectionGroup: ConfigSectionGroup = {
    sort: 0,
    children: [],
    frontId: state.currentFrontId++,
    label: "",
    show: true,
    multiple: false,
    type: ConfigEntityType.SectionGroup,
  };
  return sectionGroup;
};

export const createList = (state: ConfigSlice) => {
  const list: ConfigList = {
    frontId: state.currentFrontId++,
    show: true,
    type: ConfigEntityType.List,
    sort: 0,
    label: "",
    multiple: false,
    children: [],
  };
  return list;
};

export const createTableItem = (state: ConfigSlice) => {
  const newTableItem: ConfigItemValue = {
    frontId: state.currentFrontId++,
    label: "",
    show: true,
    sort: 0,
    type: ConfigEntityType.Value,
    price: {
      type: PriceTypes.Currency,
      value: 0,
    },
  };
  return newTableItem;
};

export const sortItems = (a: { sort: number }, b: { sort: number }) => {
  return a.sort - b.sort;
};
