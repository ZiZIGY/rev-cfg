import { FC, useState } from "react";

import Area from "./components/Area";
import { Box } from "@mui/material";
import Header from "./components/Header";
import ImgModal from "./components/UI/Modals/ImgModal";
import Sidebar from "./components/Sidebar";
import { useAppSelector } from "./hooks";

export const App: FC = () => {
  const { img } = useAppSelector((state) => state.config.modals);
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
      {img.isOpen && <ImgModal />}
    </Box>
  );
};
