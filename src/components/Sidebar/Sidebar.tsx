import { Box } from "@mui/material";
import { FC } from "react";
import Tree from "./Tree";
import { useAppSelector } from "../../hooks";

export const Sidebar: FC = () => {
  const { sections } = useAppSelector((state) => state.config);
  return (
    <Box
      sx={{
        padding: "20px",
        resize: "horizontal",
        overflowX: "auto",
        overflowY: "scroll",
        height: "100%",
        boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
        scrollbarWidth: "thin",
        scrollbarColor: "#1976d2 #ffffff",
      }}
    >
      <Tree items={sections} parent={undefined} />
    </Box>
  );
};
