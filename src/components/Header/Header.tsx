import {
  AppBar,
  Divider,
  IconButton,
  Stack,
  Toolbar,
  Tooltip,
} from "@mui/material";
import { Dispatch, FC, SetStateAction } from "react";

import PlaylistRemoveIcon from "@mui/icons-material/PlaylistRemove";
import ViewSidebarIcon from "@mui/icons-material/ViewSidebar";
import { clearArea } from "../../redux/areaSlice";
import { useAppDispatch } from "../../hooks";

export const Header: FC<{
  sidebarAction: Dispatch<SetStateAction<boolean>>;
  sidebarStatus: boolean;
}> = (props) => {
  const storeDispatch = useAppDispatch();
  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Tooltip title="Показать / скрыть боковую панель">
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            sx={{ mr: 1 }}
            tabIndex={-1}
            onClick={() => props.sidebarAction(!props.sidebarStatus)}
          >
            <ViewSidebarIcon />
          </IconButton>
        </Tooltip>
        <Stack direction="row" spacing={1} divider={<Divider flexItem />}>
          <Tooltip title="Очистить область">
            <IconButton
              color="inherit"
              onClick={() => storeDispatch(clearArea())}
            >
              <PlaylistRemoveIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
