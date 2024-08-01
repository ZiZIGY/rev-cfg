import { FC } from "react";
import Tree from "./Tree";
import { useAppSelector } from "../../hooks";

export const Sidebar: FC = () => {
  const { sections } = useAppSelector((state) => state.config);
  return (
    <aside className="p-5 resize-x overflow-x-auto shadow-md shadow-black overflow-y-scroll">
      <Tree items={sections} parent={undefined} />
    </aside>
  );
};
