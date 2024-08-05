import { ActiveComponent, ConfigEntityType } from "../../../../@types";
import {
  Box,
  Checkbox,
  Chip,
  Divider,
  FormControlLabel,
  IconButton,
  List,
  ListItem,
  Paper,
  Stack,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { FC, useState } from "react";

import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";

export const AreaList: FC<{
  component: ActiveComponent;
}> = (props) => {
  const [tableHead, setTableHead] = useState([
    {
      label: "Label",
      show: true,
    },
  ]);

  const [showPadding, setShowPadding] = useState(true);

  return (
    <Paper elevation={2} sx={{ padding: "20px", marginBottom: "40px" }}>
      <TableContainer>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <List>
            <ListItem disablePadding>
              {props.component.parents
                ?.sort((a, b) => a.frontId - b.frontId)
                .map((parent) => (
                  <Chip
                    tabIndex={-1}
                    sx={{ marginRight: "10px" }}
                    clickable
                    label={parent.label}
                    color={
                      parent.type === ConfigEntityType.Section
                        ? "primary"
                        : "secondary"
                    }
                  />
                ))}
            </ListItem>
          </List>
          <Stack
            direction="row"
            spacing={1}
            divider={<Divider orientation="vertical" />}
            sx={{ margin: "auto 0" }}
          >
            <IconButton tabIndex={-1}>
              <AddIcon />
            </IconButton>
            <IconButton tabIndex={-1}>
              <AddIcon />
            </IconButton>
          </Stack>
        </Box>
        <Divider />
        <Table padding={showPadding ? "normal" : "none"}>
          <TableHead>
            <TableRow></TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>11111</TableCell>
              <TableCell>11111</TableCell>
              <TableCell>11111</TableCell>
              <TableCell>11111</TableCell>
              <TableCell>11111</TableCell>
            </TableRow>
          </TableBody>
          <TableFooter></TableFooter>
        </Table>
        <FormControlLabel
          value={showPadding}
          onChange={() => setShowPadding(!showPadding)}
          control={<Switch />}
          label="Убрать отступы"
        />
      </TableContainer>
    </Paper>
  );
};
