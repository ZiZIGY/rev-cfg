import { FC, useEffect, useState } from "react";

import { ActiveComponent } from "../../../@types";
import AreaList from "./AreaList";
import { findRecursive } from "../../../lib";
import { useAppSelector } from "../../../hooks";

export const AreaComponents: FC = () => {
  const { componentsIds } = useAppSelector((state) => state.area);
  const { sections } = useAppSelector((state) => state.config);

  const [components, setComponents] = useState<ActiveComponent[]>([]);

  useEffect(() => {
    componentsIds.forEach((id) => {
      const [item, ...parents] = findRecursive(["frontId", id], sections);

      setComponents((prev) => [...prev, { parents, item }]);
    });

    return () => setComponents([]);
  }, [componentsIds, sections]);

  return (
    <>
      {components.map(
        (component, index) =>
          component.item &&
          component.parents?.length && (
            <AreaList component={component} key={index} />
          )
      )}
    </>
  );
};
