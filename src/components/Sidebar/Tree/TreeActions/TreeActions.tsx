import {
  Box,
  Divider,
  IconButton,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";
import {
  ConfigEntityType,
  ConfigSection,
  ConfigSectionGroup,
  SortType,
} from "../../../../@types";
import { FC, useId, useState } from "react";
import {
  addSection,
  addSectionGroup,
  changeFilterText,
  clearSections,
  findSectionByFilter,
  reorder,
} from "../../../../redux/configSlice";
import { useAppDispatch, useAppSelector } from "../../../../hooks";

import AddIcon from "@mui/icons-material/Add";
import AdsClickIcon from "@mui/icons-material/AdsClick";
import AppsIcon from "@mui/icons-material/Apps";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import FolderOffIcon from "@mui/icons-material/FolderOff";
import KeyboardIcon from "@mui/icons-material/Keyboard";
import RemoveButton from "../../../RemoveButton";
import SearchIcon from "@mui/icons-material/Search";

export const TreeActions: FC<{
  parent: undefined | ConfigSection | ConfigSectionGroup;
}> = ({ parent }) => {
  const id = useId();

  const storeDispatch = useAppDispatch();
  const [sortType, setSortType] = useState<SortType>("asc");

  const { text } = useAppSelector((state) => state.config.filter);

  const haveSection = parent
    ? parent?.children.some(
        (child: ConfigSection | ConfigSectionGroup) =>
          child.type === ConfigEntityType.Section
      )
    : false;

  const haveSectionGroup = parent
    ? parent.children.some(
        (child: ConfigSection | ConfigSectionGroup) =>
          child.type === ConfigEntityType.SectionGroup
      )
    : false;

  const actions: TreeAction[] = [
    {
      icon: {
        original: <AddIcon color="action" />,
        alternate: (
          <AddIcon
            color="disabled"
            sx={{
              opacity: 0.5,
            }}
          />
        ),
        switch: haveSectionGroup,
      },
      label: "Создать раздел",
      onClick: () => {
        !haveSectionGroup &&
          storeDispatch(addSection(parent ? parent.frontId : undefined));
      },
      showComponent:
        parent?.type === ConfigEntityType.Section || parent === undefined,
    },
    {
      icon: {
        original: <CreateNewFolderIcon color="action" />,
        alternate: (
          <FolderOffIcon
            color="disabled"
            sx={{
              opacity: 0.5,
            }}
          />
        ),
        switch: haveSection,
      },
      label: "Создать группу",
      onClick: () =>
        !haveSection &&
        storeDispatch(addSectionGroup(parent ? parent.frontId : undefined)),
      showComponent:
        parent?.type === ConfigEntityType.SectionGroup ||
        parent?.type === ConfigEntityType.Section,
    },
    {
      icon: {
        original: <AppsIcon color="action" />,
      },
      label: "Создать список",
      onClick: () => console.log("Создать список"),
      showComponent:
        parent?.type === ConfigEntityType.Section ||
        parent?.type === ConfigEntityType.SectionGroup,
    },
    {
      icon: {
        original: <KeyboardIcon color="action" />,
      },
      label: "Создать поле ввода",
      onClick: () => console.log("Создать поле ввода"),
      showComponent:
        parent?.type === ConfigEntityType.Section ||
        parent?.type === ConfigEntityType.SectionGroup,
    },
    {
      icon: {
        original: <AdsClickIcon color="action" />,
      },
      label: "Создать поле выбора",
      onClick: () => console.log("Создать кнопку"),
      showComponent:
        parent?.type === ConfigEntityType.Section ||
        parent?.type === ConfigEntityType.SectionGroup,
    },
    {
      icon: {
        original: <ArrowUpwardIcon color="action" />,
        alternate: <ArrowDownwardIcon color="action" />,
        switch: sortType === "desc",
      },
      label: "Изменить сортировку",
      onClick: () => {
        setSortType(sortType === "asc" ? "desc" : "asc");
        storeDispatch(
          reorder({
            id: parent ? parent.frontId : undefined,
            sort: sortType,
          })
        );
      },
      showComponent:
        parent === undefined ||
        parent.type === ConfigEntityType.Section ||
        parent.type === ConfigEntityType.SectionGroup,
    },
  ];

  return (
    <Box>
      <Stack
        id={id}
        direction="row"
        spacing={1}
        sx={{
          marginBottom: 1,
        }}
        divider={<Divider orientation="vertical" flexItem />}
      >
        {actions.map((action, index) =>
          action.showComponent ? (
            <Tooltip title={action.label} key={id + index}>
              <IconButton
                tabIndex={-1}
                className={index === actions.length - 1 ? "!mr-auto" : ""}
                onClick={action.onClick}
              >
                {action.icon.switch
                  ? action.icon.alternate
                  : action.icon.original}
              </IconButton>
            </Tooltip>
          ) : null
        )}
        {parent === undefined && (
          <TextField
            size="small"
            label="Поиск"
            fullWidth
            value={text}
            InputProps={{
              endAdornment: (
                <IconButton
                  size="small"
                  onClick={() => storeDispatch(findSectionByFilter())}
                >
                  <SearchIcon />
                </IconButton>
              ),
            }}
            onChange={({ target }) => {
              storeDispatch(changeFilterText(target.value));
            }}
          />
        )}
        <RemoveButton
          label="Удалить дочерние элементы"
          removeFunction={() =>
            storeDispatch(clearSections(parent ? parent.frontId : undefined))
          }
          increase={25}
        />
      </Stack>
      <Divider />
    </Box>
  );
};

interface TreeAction {
  icon: {
    original: any;
    alternate?: any;
    switch?: boolean;
  };
  label: string;
  onClick: () => void;
  showComponent: boolean;
}
