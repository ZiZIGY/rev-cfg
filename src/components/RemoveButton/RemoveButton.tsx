/* eslint-disable react-hooks/exhaustive-deps */

import { CircularProgress, IconButton, Tooltip } from "@mui/material";
import { FC, useEffect, useState } from "react";

import DeleteIcon from "@mui/icons-material/Delete";
import { MUIColor } from "../../@types";

export const RemoveButton: FC<{
  label?: string;
  color?: MUIColor;
  increase: number;
  removeFunction: CallableFunction;
}> = (props) => {
  let timer: NodeJS.Timeout;

  const [removeClicked, setRemoveClicked] = useState(false);

  const [time, setTime] = useState(0);

  useEffect(() => {
    if (removeClicked)
      timer = setTimeout(() => {
        setTime(time + props.increase);
        if (time >= 100 + props.increase) {
          setTime(0);
          setRemoveClicked(false);
          props.removeFunction();
        }
      }, 100);

    return () => clearTimeout(timer);
  }, [removeClicked, time]);

  return (
    <Tooltip title={props.label}>
      <IconButton
        sx={{
          position: "relative",
        }}
        color={props.color ? props.color : "error"}
        onClick={() => {
          setTime(0);
          setRemoveClicked(!removeClicked);
        }}
        tabIndex={-1}
      >
        {removeClicked && (
          <CircularProgress
            variant="determinate"
            value={time}
            color={props.color ? props.color : "error"}
            sx={{
              position: "absolute",
            }}
          />
        )}
        <DeleteIcon color={props.color ? props.color : "error"} />
      </IconButton>
    </Tooltip>
  );
};
