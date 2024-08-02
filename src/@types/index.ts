import { store } from "../redux/store";

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export interface ConfigSlice {
  openedSections: number[];
  currentFrontId: number | 0;
  sections: ConfigSection[];
}

export interface ConfigEntity<T> {
  frontId: number | 0;
  show: boolean;
  type: T;
  sort: number;
  label: string;
  multiple?: boolean;
}

export interface ConfigSection extends ConfigEntity<ConfigEntityType.Section> {
  children: Array<ConfigSection> &
    Array<ConfigSectionGroup> &
    Array<ConfigList>;
  values: number[];
}

export type SortType = "asc" | "desc";

export interface ConfigSectionGroup
  extends ConfigEntity<ConfigEntityType.SectionGroup> {
  children: Array<ConfigSectionGroup> & Array<ConfigList>;
}

export enum ConfigEntityType {
  Value = "value",
  Section = "section",
  SectionGroup = "section-group",
  Select = "select",
  Input = "input",
  List = "list",
}

export interface ConfigList extends ConfigEntity<ConfigEntityType.List> {
  children: [];
}

export type MUIColor =
  | "inherit"
  | "primary"
  | "secondary"
  | "error"
  | "info"
  | "success"
  | "warning";

export type RecursiveActions = "delete" | "includes";
