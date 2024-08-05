import { Box, Divider, IconButton, Stack, Tooltip } from "@mui/material";
import {
  ConfigEntity,
  ConfigEntityType,
  ConfigSection,
  ConfigSectionGroup,
  TreeAction,
} from "../../../../@types";
import { FC, useId } from "react";
import {
  addList,
  addSection,
  addSectionGroup,
  clearSections,
} from "../../../../redux/configSlice";

import AddIcon from "@mui/icons-material/Add";
import AdsClickIcon from "@mui/icons-material/AdsClick";
import AppsIcon from "@mui/icons-material/Apps";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import FolderOffIcon from "@mui/icons-material/FolderOff";
import KeyboardIcon from "@mui/icons-material/Keyboard";
import RemoveButton from "../../../UI/RemoveButton";
import TreeFilter from "../TreeFilter";
import { useAppDispatch } from "../../../../hooks";

export const TreeActions: FC<{
  parent: undefined | ConfigSection | ConfigSectionGroup;
}> = ({ parent }) => {
  const id = useId();

  const storeDispatch = useAppDispatch();

  const haveSection = parent
    ? parent?.children.some(
        (child: ConfigEntity<unknown>) =>
          child.type === ConfigEntityType.Section
      )
    : false;

  const haveSectionGroup = parent
    ? parent.children.some(
        (child: ConfigEntity<unknown>) =>
          child.type === ConfigEntityType.SectionGroup
      )
    : false;

  const haveItems = parent
    ? parent.children.some(
        (child: ConfigEntity<unknown>) =>
          child.type === ConfigEntityType.List ||
          child.type === ConfigEntityType.Input ||
          child.type === ConfigEntityType.Select
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
        switch: haveSectionGroup || haveItems,
      },
      label: "Создать раздел",
      onClick: () => {
        !haveSectionGroup &&
          !haveItems &&
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
        switch: haveSection || haveItems,
      },
      label: "Создать группу",
      onClick: () =>
        !haveSection &&
        !haveItems &&
        storeDispatch(addSectionGroup(parent ? parent.frontId : undefined)),
      showComponent:
        parent?.type === ConfigEntityType.SectionGroup ||
        parent?.type === ConfigEntityType.Section,
    },
    {
      icon: {
        original: <AppsIcon color="action" />,
        alternate: (
          <AppsIcon
            color="disabled"
            sx={{
              opacity: 0.5,
            }}
          />
        ),
        switch: haveSectionGroup || haveSection,
      },
      label: "Создать список",
      onClick: () =>
        !haveSection &&
        !haveSectionGroup &&
        storeDispatch(addList(parent ? parent.frontId : undefined)),
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
        {parent === undefined && <TreeFilter />}
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
