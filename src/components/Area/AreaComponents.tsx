import {
  ConfigEntities,
  ConfigInput,
  ConfigList,
  ConfigSection,
  ConfigSectionGroup,
  ConfigSelect,
} from "../../@types";
import { FC, useEffect, useState } from "react";

import AreaComponent from "./AreaComponent";
import { Box } from "@mui/material";
import { findRecursive } from "../../lib";
import { useAppSelector } from "../../hooks";

export const AreaComponents: FC = () => {
  const { componentsIds } = useAppSelector((state) => state.area);
  const { sections } = useAppSelector((state) => state.config);
  const [components, setComponents] = useState<ConfigEntities[]>([]);
  useEffect(() => {
    componentsIds.forEach((id) => {
      findRecursive(["frontId", id], sections, (item: ConfigEntities) => {
        setComponents((prev) => [...prev, item]);
      });
    });

    return () => setComponents([]);
  }, [sections, componentsIds]);

  return (
    <Box>
      {components.map((item, index) => (
        <AreaComponent
          key={index + item.frontId}
          component={item as ConfigList & ConfigInput & ConfigSelect}
        />
      ))}
    </Box>
  );
};
