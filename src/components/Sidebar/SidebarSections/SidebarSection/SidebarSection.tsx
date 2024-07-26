import {
  Autocomplete,
  Box,
  Divider,
  IconButton,
  Stack,
  TextField,
} from "@mui/material";
import { ChangeEvent, FC, useId, useState } from "react";
import { ConfigSection, ConfigSectionGroup } from "../../../../@types";
import { Reorder, useDragControls } from "framer-motion";
import {
  changeLabel,
  changeMultiple,
  changeVisibility,
  deleteItem,
} from "../../../../redux/configSlice";

import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import OpenWithIcon from "@mui/icons-material/OpenWith";
import RemoveButton from "../../../RemoveButton";
import { SidebarSections } from "../SidebarSections";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
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
    <>
      <Reorder.Item
        key={id}
        value={props.section}
        dragListener={false}
        dragControls={controls}
        className={
          dragging === id ? "bg-gray-200 py-[5px] rounded-md" : "py-[5px]"
        }
      >
        <Box>
          <Stack
            direction="row"
            divider={<Divider orientation="vertical" flexItem />}
            spacing={1}
          >
            <IconButton
              color={props.section.show ? "primary" : "secondary"}
              tabIndex={-1}
              onClick={() => dispatch(changeVisibility(props.section.frontId))}
            >
              {props.section.show ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </IconButton>
            <IconButton
              tabIndex={-1}
              color="primary"
              onClick={() => dispatch(changeMultiple(props.section.frontId))}
            >
              {props.section.multiple ? (
                <CheckBoxIcon />
              ) : (
                <CheckBoxOutlineBlankIcon />
              )}
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
              getOptionLabel={(option) => option}
              value={props.section.label}
              size="small"
              disableClearable
              freeSolo
              groupBy={(option) => option.charAt(0).toUpperCase()}
              autoHighlight
              onInput={(event: ChangeEvent<HTMLInputElement>) => {
                dispatch(
                  changeLabel({
                    id: props.section.frontId,
                    label: event.target.value,
                  })
                );
              }}
              onChange={(e: any, value: string) => {
                dispatch(
                  changeLabel({
                    id: props.section.frontId,
                    label: value,
                  })
                );
              }}
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
        </Box>
      </Reorder.Item>
      {open && (
        <SidebarSections
          padding="30px"
          parent={props.section}
          sections={
            props.section.children as ConfigSection[] | ConfigSectionGroup[]
          }
        />
      )}
    </>
  );
};
