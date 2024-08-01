import { Box, List } from "@mui/material";
import { ConfigSection, ConfigSectionGroup } from "../../../@types";

import { FC } from "react";
import TreeActions from "./TreeActions";
import TreeSection from "./TreeSection";

export const Tree: FC<{
  items: ConfigSection[] | ConfigSectionGroup[];
  parent: undefined | ConfigSection | ConfigSectionGroup;
}> = ({ items, parent }) => {
  return (
    <Box sx={{ paddingLeft: parent ? "57px" : 0 }}>
      <TreeActions parent={parent} />
      <List>
        {items.map((item, index) => (
          <TreeSection item={item} parent={parent} key={index} />
        ))}
      </List>
    </Box>
  );
};