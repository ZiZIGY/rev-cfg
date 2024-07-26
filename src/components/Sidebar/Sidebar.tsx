import { ConfigSection } from "../../@types";
import { Divider } from "@mui/material";
import { FC } from "react";
import SidebarBaseActions from "./SidebarBaseActions";
import SidebarSections from "./SidebarSections";
import { useAppSelector } from "../../hooks";

export const Sidebar: FC = () => {
  const { sections } = useAppSelector((state) => state.config);
  return (
    <aside className="p-5 resize-x overflow-x-auto shadow-md shadow-black overflow-y-scroll">
      <SidebarBaseActions />
      <Divider />
      <SidebarSections parent={undefined} sections={sections} />
    </aside>
  );
};
