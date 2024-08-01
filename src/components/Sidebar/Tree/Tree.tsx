import { Box, List } from "@mui/material";
import { ConfigSection, ConfigSectionGroup } from "../../../@types";

import { FC } from "react";
import TreeActions from "./TreeActions";
import TreeSection from "./TreeSection";
import { useAppSelector } from "../../../hooks";

export const Tree: FC<{
  items: ConfigSection[] | ConfigSectionGroup[];
  parent: undefined | ConfigSection | ConfigSectionGroup;
}> = ({ items, parent }) => {
  const { highlight } = useAppSelector((state) => state.config.filter);
  return (
    <Box
      sx={{
        paddingLeft: parent ? "57px" : 0,
      }}
    >
      <TreeActions parent={parent} />
      <List>
        {items.map((item, index) => (
          <TreeSection item={item} parent={parent} key={index} />
        ))}
      </List>
    </Box>
  );
};
