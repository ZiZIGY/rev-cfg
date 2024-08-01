import { Box, Divider, IconButton, Stack, Tooltip } from "@mui/material";
import {
  ConfigEntityType,
  ConfigSection,
  ConfigSectionGroup,
} from "../../../../@types";
import { FC, useId } from "react";
import {
  addSection,
  addSectionGroup,
  clearSections,
} from "../../../../redux/configSlice";

import AddIcon from "@mui/icons-material/Add";
import AdsClickIcon from "@mui/icons-material/AdsClick";
import AppsIcon from "@mui/icons-material/Apps";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import KeyboardIcon from "@mui/icons-material/Keyboard";
import RemoveButton from "../../../RemoveButton";
import { useAppDispatch } from "../../../../hooks";

export const TreeActions: FC<{
  parent: undefined | ConfigSection | ConfigSectionGroup;
}> = ({ parent }) => {
  const id = useId();

  const storeDispatch = useAppDispatch();

  const actions: TreeAction[] = [
    {
      icon: {
        original: AddIcon,
      },
      label: "Cоздать раздел",
      onClick: () => {
        storeDispatch(addSection(parent ? parent.frontId : undefined));
      },
      showComponent:
        parent?.type === ConfigEntityType.Section || parent === undefined,
    },
    {
      icon: {
        original: CreateNewFolderIcon,
      },
      label: "Создать группу",
      onClick: () =>
        storeDispatch(addSectionGroup(parent ? parent.frontId : undefined)),
      showComponent:
        parent?.type === ConfigEntityType.SectionGroup ||
        parent?.type === ConfigEntityType.Section,
    },
    {
      icon: {
        original: AppsIcon,
      },
      label: "Создать список",
      onClick: () => console.log("Создать список"),
      showComponent:
        parent?.type === ConfigEntityType.Section ||
        parent?.type === ConfigEntityType.SectionGroup,
    },
    {
      icon: {
        original: KeyboardIcon,
      },
      label: "Создать инпут",
      onClick: () => console.log("Создать поле ввода"),
      showComponent:
        parent?.type === ConfigEntityType.Section ||
        parent?.type === ConfigEntityType.SectionGroup,
    },
    {
      icon: {
        original: AdsClickIcon,
      },
      label: "Создать селект",
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
        key={id}
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
                className={index === actions.length - 1 ? "!mr-auto" : ""}
                onClick={action.onClick}
              >
                {action.icon.switch ? (
                  <action.icon.alternate />
                ) : (
                  <action.icon.original />
                )}
              </IconButton>
            </Tooltip>
          ) : null
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
    switch?: boolean | (() => boolean);
  };
  label: string;
  onClick: () => void;
  showComponent: boolean | (() => boolean);
}
