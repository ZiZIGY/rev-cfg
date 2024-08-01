import { store } from "../redux/store";

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export interface ConfigSlice {
  currentFrontId: number | 0;
  sections: ConfigSection[];
}

export interface ConfigEntity<T> {
  frontId: number | 0;
  show: boolean;
  type: T;
  label?: string;
  multiple?: boolean;
}

export interface ConfigSection extends ConfigEntity<ConfigEntityType.Section> {
  children: Array<ConfigSection> & Array<ConfigSectionGroup>;
}

export interface ConfigSectionGroup
  extends ConfigEntity<ConfigEntityType.SectionGroup> {
  children: ConfigSectionGroup[];
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
  name: string;
  values: string[];
}

export type MUIColor =
  | "inherit"
  | "primary"
  | "secondary"
  | "error"
  | "info"
  | "success"
  | "warning";

export type RecursiveActions = "delete";
