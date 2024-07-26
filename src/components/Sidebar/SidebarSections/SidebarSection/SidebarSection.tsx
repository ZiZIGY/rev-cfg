import {
  Autocomplete,
  Divider,
  IconButton,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";
import { ConfigSection, ConfigSectionGroup } from "../../../../@types";
import { FC, useEffect, useId, useState } from "react";
import { Reorder, useDragControls } from "framer-motion";
import { changeVisibility, deleteItem } from "../../../../redux/configSlice";

import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import OpenWithIcon from "@mui/icons-material/OpenWith";
import RemoveButton from "../../../RemoveButton";
import { baseDictionary } from "../../../../utils";
import { useAppDispatch } from "../../../../hooks";

export const SidebarSection: FC<{
  section: ConfigSection | ConfigSectionGroup;
  parent: ConfigSection | ConfigSectionGroup | undefined;
}> = (props) => {
  const [open, setOpen] = useState<boolean>(false);

  const [dragging, setDragging] = useState<string>();

  const controls = useDragControls();

  const id = useId();

  const dispatch = useAppDispatch();

  return (
    <Reorder.Item
      key={id}
      value={props.section}
      dragListener={false}
      dragControls={controls}
      className={
        dragging === id ? "bg-gray-300 py-[5px] rounded-md" : "py-[5px]"
      }
    >
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={1}
      >
        <IconButton
          color="primary"
          tabIndex={-1}
          onClick={() => dispatch(changeVisibility(props.section.frontId))}
        >
          {props.section.show ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}
        </IconButton>
        <IconButton
          tabIndex={-1}
          color="primary"
          onPointerDown={(event) => {
            setDragging(id);
            controls.start(event);
          }}
          onPointerUp={() => setDragging(undefined)}
        >
          <OpenWithIcon />
        </IconButton>
        <IconButton
          tabIndex={-1}
          onClick={() => setOpen(!open)}
          color="primary"
        >
          {open ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
        </IconButton>
        <Autocomplete
          id="combo-box-demo"
          sx={{ width: 300 }}
          value={props.section.label}
          size="small"
          disableClearable
          freeSolo
          groupBy={(option) => option.charAt(0).toUpperCase()}
          autoHighlight
          options={baseDictionary}
          renderInput={(params) => <TextField {...params} />}
        />
        <RemoveButton
          removeFunction={() => {
            dispatch(deleteItem(props.section.frontId));
          }}
          increase={25}
        />
      </Stack>
    </Reorder.Item>
  );
};
