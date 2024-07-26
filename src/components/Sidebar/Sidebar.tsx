import { Divider } from "@mui/material";
import { FC } from "react";
import SidebarBaseActions from "./SidebarBaseActions";
import SidebarSections from "./SidebarSections";

export const Sidebar: FC = () => {
  return (
    <aside className="p-5 max-w-[400px] w-full">
      <h2>меню</h2>
      <SidebarBaseActions />
      <Divider />
      <SidebarSections />
    </aside>
  );
};
