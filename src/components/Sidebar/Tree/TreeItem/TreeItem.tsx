import {
  ConfigList,
  ConfigSection,
  ConfigSectionGroup,
} from "../../../../@types";
import { Divider, IconButton, ListItem, Stack, TextField } from "@mui/material";
import { FC, ReactElement, useDeferredValue, useEffect, useState } from "react";
import {
  changeMultiple,
  changeOrder,
  changeVisibility,
  deleteItem,
} from "../../../../redux/configSlice";

import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import EditIcon from "@mui/icons-material/Edit";
import RemoveButton from "../../../RemoveButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useAppDispatch } from "../../../../hooks";

export const TreeItem: FC<{
  item: ConfigList;
  parent: ConfigSection | ConfigSectionGroup;
}> = (props) => {
  const storeDispatch = useAppDispatch();

  const [sort, setSort] = useState<number>(props.item.sort);

  const newSort = useDeferredValue(sort as number);

  const actions: TreeItemAction[] = [
    {
      component: (
        <IconButton
          onClick={() => storeDispatch(changeVisibility(props.item.frontId))}
        >
          {props.item.show ? <VisibilityIcon /> : <VisibilityOffIcon />}
        </IconButton>
      ),
      show: true,
    },
    {
      component: (
        <IconButton
          onClick={() => storeDispatch(changeMultiple(props.item.frontId))}
        >
          {props.item.multiple ? (
            <CheckBoxIcon />
          ) : (
            <CheckBoxOutlineBlankIcon />
          )}
        </IconButton>
      ),
      show: true,
    },
    {
      component: (
        <IconButton>
          <EditIcon />
        </IconButton>
      ),
      show: true,
    },
  ];

  useEffect(() => {
    storeDispatch(
      changeOrder({
        id: props.item.frontId,
        sort: newSort,
      })
    );
  }, [newSort]);

  return (
    <ListItem
      sx={{
        padding: 0,
        marginBottom: 1,
        width: "100%",
      }}
    >
      <Stack
        spacing={1}
        direction="row"
        sx={{
          width: "100%",
        }}
        divider={<Divider orientation="vertical" flexItem />}
      >
        {actions.map((action) => (action.show ? action.component : null))}
        <TextField
          label="Сортировка"
          size="small"
          type="number"
          value={props.item.sort}
          sx={{
            minWidth: "60px",
          }}
          fullWidth
          onChange={({ target }) =>
            setSort(Number(target.value) ? Number(target.value) : 0)
          }
        />
        <RemoveButton
          increase={25}
          label="Удалить список"
          removeFunction={() => storeDispatch(deleteItem(props.item.frontId))}
        />
      </Stack>
    </ListItem>
  );
};

interface TreeItemAction {
  component: ReactElement;
  show: boolean;
}
