import Area from "./components/Area";
import { Box } from "@mui/material";
import { FC } from "react";
import Sidebar from "./components/Sidebar";

export const App: FC = () => {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          height: "100%",
        }}
      >
        <Sidebar />
        <Area />
      </Box>
    </Box>
  );
};
