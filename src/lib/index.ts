import {
  ConfigEntityType,
  ConfigSection,
  ConfigSectionGroup,
  ConfigSlice,
  RecursiveActions,
  SortType,
} from "../@types";

export const findRecursive = (
  values: [keyof ConfigSection | keyof ConfigSectionGroup, unknown],
  array: ConfigSection[] | ConfigSectionGroup[],
  callback?: Function | RecursiveActions,
  parents: (ConfigSection | ConfigSectionGroup)[] = []
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

export const createSectionGroup = (
  state: ConfigSlice,
  section: ConfigSection | ConfigSectionGroup
) => {
  return {
    sort: 0,
    children: [],
    frontId: state.currentFrontId++,
    label: "",
    show: true,
    multiple: false,
    type: ConfigEntityType.SectionGroup,
  } as ConfigSectionGroup;
};

export const sortItems = (
  a: { sort: number },
  b: { sort: number },
  sort: SortType
) => {
  if (sort === "asc") {
    return a.sort - b.sort;
  } else {
    return b.sort - a.sort;
  }
};
