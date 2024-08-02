import { AppBar, IconButton, Toolbar, Tooltip } from "@mui/material";
import { Dispatch, FC, SetStateAction } from "react";

import ViewSidebarIcon from "@mui/icons-material/ViewSidebar";

export const Header: FC<{
  sidebarAction: Dispatch<SetStateAction<boolean>>;
  sidebarStatus: boolean;
}> = (props) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Tooltip title="Показать / скрыть боковую панель">
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            sx={{ mr: 1 }}
            onClick={() => props.sidebarAction(!props.sidebarStatus)}
          >
            <ViewSidebarIcon />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
};
