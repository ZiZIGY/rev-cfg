import { ReactElement, ReactNode } from "react";

import { store } from "../redux/store";

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export interface ConfigSlice {
  openedSections: number[];
  currentFrontId: number | 0;
  sections: ConfigSection[];
  pictures: Picture[];
  modals: Modals;
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
  children: ConfigItemValue[];
}

export interface ConfigSelect extends ConfigEntity<ConfigEntityType.Select> {
  children: ConfigItemValue[];
}

export interface ConfigInput extends ConfigEntity<ConfigEntityType.Input> {}
export interface ConfigItemValue extends ConfigEntity<ConfigEntityType.Value> {
  picture?: number | string;
  price: {
    type: PriceTypes;
    value: number;
  };
}

export type ConfigEntities =
  | ConfigSection
  | ConfigSectionGroup
  | ConfigList
  | ConfigSelect
  | ConfigInput;

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

export type TableHeader = Array<{
  label: string;
  disabled: boolean;
  show: boolean;
  cellBody: (
    cell: ConfigItemValue,
    index: number,
    pictures?: Picture[]
  ) => ReactNode;
}>;

export type Picture = {
  ID: number;
  UF_FILE: {
    CONTENT_TYPE: string;
    DESCRIPTION: string;
    EXTERNAL_ID: string;
    FILE_NAME: string;
    FILE_SIZE: number;
    HANDLER_ID: unknown;
    HEIGHT: number;
    ID: number;
    META: string;
    MODULE_ID: string;
    ORIGINAL_NAME: string;
    SRC: string;
    SUBDIR: string;
    TIMESTAMP_X: string;
    VERSION_ORIGINAL_ID: null;
    WIDTH: number;
  };
  UF_NAME: string;
};

export type Modals = {
  img: {
    isOpen: boolean;
    element: number;
  };
};

export type useFetchReturnType = { loading: boolean; fetchedData: any };

export type RecursiveActions = "delete" | "includes";
