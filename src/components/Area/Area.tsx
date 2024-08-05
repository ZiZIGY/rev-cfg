import AreaComponents from "./AreaComponents";
import { Box } from "@mui/material";
import { FC } from "react";

export const Area: FC = () => {
  return (
    <Box sx={{ height: "100%", padding: "40px", overflow: "auto" }}>
      <AreaComponents />
    </Box>
  );
};
