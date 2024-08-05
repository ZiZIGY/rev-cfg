import { ReactElement, ReactNode } from "react";

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
  label?: string;
  multiple?: boolean;
}

export interface ConfigSection extends ConfigEntity<ConfigEntityType.Section> {
  children: Array<ConfigSection> &
    Array<ConfigSectionGroup> &
    Array<ConfigList>;
  values: number[];
}

export interface AreaSlice {
  componentsIds: number[];
}

export interface TreeItemAction {
  component: ReactElement;
  show: boolean;
}

export interface TreeAction {
  icon: {
    original: ReactNode;
    alternate?: ReactNode;
    switch?: boolean;
  };
  label: string;
  onClick: () => void;
  showComponent: boolean;
}

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
  values: ConfigItemValue[];
}

export interface ConfigItemValue extends ConfigEntity<ConfigEntityType.Value> {
  picture?: number | string;
  price: {
    type: PriceTypes;
    value: number;
  };
}

export enum PriceTypes {
  Percent = "percent",
  Currency = "currency",
  Free = "free",
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

export type ActiveComponent = {
  parents?: (ConfigSection | ConfigSectionGroup)[];
  item?: ConfigSection | ConfigSectionGroup;
};
