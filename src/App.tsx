import { FC, useState } from "react";

import Area from "./components/Area";
import { Box } from "@mui/material";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

export const App: FC = () => {
  const [showSidebar, setSidebarVisible] = useState(true);
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
      }}
    >
      {showSidebar && <Sidebar />}
      <Box
        sx={{
          display: "flex",
          height: "100%",
          flexDirection: "column",
          flex: 1,
        }}
      >
        <Header sidebarAction={setSidebarVisible} sidebarStatus={showSidebar} />
        <Area />
      </Box>
    </Box>
  );
};
