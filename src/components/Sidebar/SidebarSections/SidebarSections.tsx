import { FC, useId } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks";

import { List } from "@mui/material";
import { Reorder } from "framer-motion";
import SidebarSection from "./SidebarSection";
import { changeOrder } from "../../../redux/configSlice";

export const SidebarSections: FC = () => {
  const dispatch = useAppDispatch();
  const { sections } = useAppSelector((state) => state.config);
  const id = useId();

  return (
    <List key={id} id={id}>
      <Reorder.Group
        axis="y"
        values={sections}
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
