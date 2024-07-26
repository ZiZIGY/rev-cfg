import { ConfigSection, ConfigSectionGroup } from "../../../@types";
import { FC, useId } from "react";
import { addSection, changeOrder } from "../../../redux/configSlice";

import { List } from "@mui/material";
import { Reorder } from "framer-motion";
import SidebarSection from "./SidebarSection";
import { useAppDispatch } from "../../../hooks";

export const SidebarSections: FC<{
  parent: ConfigSection | ConfigSectionGroup | undefined;
  sections: ConfigSection[] | ConfigSectionGroup[];
  padding?: string;
}> = ({ parent, sections, padding }) => {
  const dispatch = useAppDispatch();
  const id = useId();

  return (
    <List
      key={id}
      id={id}
      sx={{
        paddingLeft: padding ? padding : 0,
      }}
    >
      {parent && (
        <div>
          <button onClick={() => dispatch(addSection(parent.frontId))}>
            +
          </button>
        </div>
      )}
      <Reorder.Group
        axis="y"
        values={sections as (ConfigSection | ConfigSectionGroup)[]}
        onReorder={(newOrder) => dispatch(changeOrder(newOrder))}
      >
        {sections.map((section) => (
          <SidebarSection
            section={section}
            key={section.frontId}
            parent={undefined}
          />
        ))}
      </Reorder.Group>
    </List>
  );
};
