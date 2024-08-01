import {
  Autocomplete,
  Badge,
  Divider,
  IconButton,
  ListItem,
  Stack,
  TextField,
} from "@mui/material";
import {
  ConfigEntityType,
  ConfigSection,
  ConfigSectionGroup,
} from "../../../../@types";
import { FC, useDeferredValue, useEffect, useState } from "react";
import {
  changeLabel,
  changeMultiple,
  changeVisibility,
  deleteItem,
} from "../../../../redux/configSlice";

import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import RemoveButton from "../../../RemoveButton";
import { Tree } from "../Tree";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { baseDictionary } from "../../../../utils";
import { useAppDispatch } from "../../../../hooks";

export const TreeSection: FC<{
  item: ConfigSection | ConfigSectionGroup;
  parent: undefined | ConfigSection | ConfigSectionGroup;
}> = ({ item, parent }) => {
  const [opened, setOpened] = useState(false);

  const storeDispatch = useAppDispatch();

  const [label, setLabel] = useState<string | undefined>(item.label);

  const newLabel = useDeferredValue(label as string);

  useEffect(() => {
    storeDispatch(
      changeLabel({
        id: item.frontId,
        label: newLabel,
      })
    );
  }, [newLabel]);

  return (
    <ListItem
      key={item.frontId}
      sx={{
        padding: 0,
        marginBottom: 1,
        position: "relative",
      }}
    >
      <Badge
        showZero
        color={item.type === ConfigEntityType.Section ? "primary" : "secondary"}
        badgeContent={item.children?.length}
        className="w-full"
        max={99}
      >
        <Stack direction="column" spacing={1} sx={{ width: "100%" }}>
          <Stack
            spacing={1}
            direction="row"
            divider={<Divider orientation="vertical" flexItem />}
          >
            <IconButton
              onClick={() => storeDispatch(changeVisibility(item.frontId))}
            >
              {item.show ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </IconButton>
            <IconButton
              onClick={() => storeDispatch(changeMultiple(item.frontId))}
            >
              {item.multiple ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}
            </IconButton>
            <IconButton onClick={() => setOpened(!opened)}>
              {opened ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
            <TextField
              label="Сортировка"
              size="small"
              type="tel"
              sx={{
                minWidth: "60px",
              }}
            />
            <Autocomplete
              disableClearable
              freeSolo
              fullWidth
              value={item.label}
              size="small"
              onChange={(_, value) => setLabel(value)}
              options={baseDictionary.sort((a, b) => a.localeCompare(b))}
              groupBy={(option) => option[0]}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Название"
                  onInput={({ target }) =>
                    setLabel((target as HTMLInputElement).value)
                  }
                />
              )}
            />
            <RemoveButton
              increase={25}
              label={"Удалить" + " " + item.label}
              removeFunction={() => storeDispatch(deleteItem(item.frontId))}
            ></RemoveButton>
          </Stack>
          {opened && <Tree items={item.children} parent={item} />}
        </Stack>
      </Badge>
    </ListItem>
  );
};
