import Area from "./components/Area";
import { Box } from "@mui/material";
import { FC } from "react";
import Header from "./components/Header";
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
      <Header />
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
