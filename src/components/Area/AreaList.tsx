import { ConfigList, TableHeader } from "../../@types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

import { FC } from "react";
import { useAppSelector } from "../../hooks";

const AreaList: FC<{
  page: number;
  rowsPerPage: number;
  body: ConfigList;
  head: TableHeader;
}> = (props) => {
  const { pictures } = useAppSelector((state) => state.config);
  return (
    <Table>
      <TableHead>
        <TableRow>
          {props.head.map(
            (headCell, index) =>
              headCell.show && (
                <TableCell key={index}>{headCell.label}</TableCell>
              )
          )}
        </TableRow>
      </TableHead>
      <TableBody>
        {props.body.children
          .filter(
            (_, index) =>
              index >= props.page * props.rowsPerPage &&
              index < props.page * props.rowsPerPage + props.rowsPerPage
          )
          .map((child, rowIndex) => (
            <TableRow key={rowIndex}>
              {props.head.map(
                (headCell, cellIndex) =>
                  headCell.show && (
                    <TableCell
                      key={cellIndex}
                      sx={{
                        padding: "0 5px",
                      }}
                    >
                      {headCell.cellBody(child, cellIndex, pictures)}
                    </TableCell>
                  )
              )}
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};
export default AreaList;
