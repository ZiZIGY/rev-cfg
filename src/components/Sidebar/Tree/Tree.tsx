import { Box, List } from "@mui/material";
import {
  ConfigEntityType,
  ConfigList,
  ConfigSection,
  ConfigSectionGroup,
} from "../../../@types";

import { FC } from "react";
import TreeActions from "./TreeActions";
import TreeItem from "./TreeItem";
import TreeSection from "./TreeSection";

export const Tree: FC<{
  items: ConfigSection[] | ConfigSectionGroup[] | ConfigList[];
  parent: undefined | ConfigSection | ConfigSectionGroup;
}> = ({ items, parent }) => {
  return (
    <Box
      sx={{
        paddingLeft: parent ? "57px" : 0,
      }}
    >
      <TreeActions parent={parent} />
      <List>
        {items.map((item, index) =>
          item.type === ConfigEntityType.Section ||
          item.type === ConfigEntityType.SectionGroup ? (
            <TreeSection
              item={
                item.type === ConfigEntityType.Section
                  ? (item as ConfigSection)
                  : (item as ConfigSectionGroup)
              }
              parent={parent}
              key={index}
            />
          ) : (
            <TreeItem
              item={item}
              parent={parent as ConfigSection | ConfigSectionGroup}
            />
          )
        )}
      </List>
    </Box>
  );
};
