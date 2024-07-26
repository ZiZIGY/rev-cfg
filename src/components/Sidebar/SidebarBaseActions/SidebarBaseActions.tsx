import { Divider, Stack, Tooltip } from "@mui/material";
import { FC, MouseEventHandler, useId } from "react";
import { addSection, clearSections } from "../../../redux/configSlice";

import AddIcon from "@mui/icons-material/Add";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import { IconButton } from "@mui/material";
import { MUIColor } from "../../../@types";
import RemoveButton from "../../RemoveButton";
import { useAppDispatch } from "../../../hooks";

export const SidebarBaseActions: FC = () => {
  let timer: NodeJS.Timeout;

  const dispatch = useAppDispatch();

  const id = useId();

  const actions: SidebarBaseAction[] = [
    {
      icon: <AddIcon />,
      label: "Добавить секцию",
      onClick: () => dispatch(addSection()),
    },
    {
      icon: <ContentPasteIcon />,
      label: "Выбрать конфигурацию",
    },
  ];

  return (
    <Stack
      direction="row"
      divider={<Divider orientation="vertical" flexItem />}
      spacing={1}
    >
      {actions.map((action, index) => (
        <Tooltip title={action.label} key={id + index}>
          <IconButton
            onClick={action.onClick}
            color={action.color ? action.color : "primary"}
            key={id + index}
            sx={{
              position: "relative",
            }}
          >
            {action.icon}
          </IconButton>
        </Tooltip>
      ))}
      <RemoveButton
        label="Удалить конфигурацию"
        color="error"
        increase={10}
        removeFunction={() => dispatch(clearSections())}
      />
    </Stack>
  );
};

type SidebarBaseAction = {
  icon: JSX.Element;
  label?: string;
  color?: MUIColor;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};
