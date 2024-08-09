import {
  Box,
  Checkbox,
  Chip,
  Divider,
  FormControlLabel,
  IconButton,
  ListItem,
  Menu,
  MenuItem,
  Paper,
  Select,
  Stack,
  Switch,
  TableContainer,
  TablePagination,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  ConfigEntity,
  ConfigEntityType,
  ConfigInput,
  ConfigList,
  ConfigSection,
  ConfigSectionGroup,
  ConfigSelect,
  TableHeader,
} from "../../@types";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { addTableItem, deleteItem, toggleModal } from "../../redux/configSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";

import AddIcon from "@mui/icons-material/Add";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import AreaInput from "./AreaInput";
import AreaList from "./AreaList";
import AreaSelect from "./AreaSelect";
import PhotoIcon from "@mui/icons-material/Photo";
import RemoveButton from "../UI/RemoveButton";
import SettingsIcon from "@mui/icons-material/Settings";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { findRecursive } from "../../lib";
import { priceTypes } from "../../utils";

const AreaComponent: FC<{
  component: ConfigList | ConfigSelect | ConfigInput;
}> = (props) => {
  const [componentParents, setComponentParents] =
    useState<(ConfigSection | ConfigSectionGroup)[]>();

  const { sections } = useAppSelector((state) => state.config);

  const storeDispatch = useAppDispatch();

  useEffect(() => {
    const [, ...parents] = findRecursive(
      ["frontId", props.component.frontId],
      sections
    );

    setComponentParents(parents as (ConfigSection | ConfigSectionGroup)[]);

    return () => setComponentParents([]);
  }, [sections]);

  const [showTooltip, setShowTooltip] = useState(false);

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [tableHeader, setTableHeader] = useState<TableHeader>([
    {
      label: "Видимость",
      show: true,
      disabled: false,
      cellBody: (cell, index) => (
        <IconButton>
          <VisibilityIcon />
        </IconButton>
      ),
    },
    {
      label: "Название",
      show: true,
      disabled: false,
      cellBody: (cell, index) => <TextField size="small" variant="standard" />,
    },
    {
      label: "Сортировка",
      show: true,
      disabled: false,
      cellBody: (cell, index) => (
        <Stack
          direction="row"
          spacing={1}
          divider={<Divider flexItem orientation="vertical" />}
        >
          <TextField size="small" variant="standard" />
          <Select fullWidth variant="standard" size="small">
            {priceTypes.map((priceType, index) => (
              <MenuItem value={priceType.value} key={index}>
                {priceType.label}
              </MenuItem>
            ))}
          </Select>
        </Stack>
      ),
    },
    {
      label: "Цена",
      show: true,
      disabled: false,
      cellBody: (cell, index) => <TextField size="small" variant="standard" />,
    },
    {
      label: "Изображение",
      disabled: false,
      show:
        props.component.type === ConfigEntityType.List ||
        props.component.type === ConfigEntityType.Select,
      cellBody: (cell, index, pictures) => (
        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          divider={<Divider flexItem orientation="vertical" />}
        >
          <IconButton
            color={cell.picture ? "secondary" : "primary"}
            onClick={() =>
              storeDispatch(
                toggleModal({
                  type: "img",
                  element: cell.frontId,
                  isOpen: true,
                })
              )
            }
          >
            {!cell.picture ? <AddPhotoAlternateIcon /> : <PhotoIcon />}
          </IconButton>
          <Tooltip
            title={
              <img
                src={
                  "https://delmard.ru/" +
                  pictures?.find((picture) => cell.picture == picture.ID)
                    ?.UF_FILE.SRC
                }
                alt="Тут должно быть изображение"
              />
            }
          >
            <Box>
              {pictures?.find((picture) => cell.picture == picture.ID)?.UF_NAME}
            </Box>
          </Tooltip>
        </Stack>
      ),
    },
    {
      label: "Действия",
      disabled: false,
      show: true,
      cellBody: (cell, index) => (
        <RemoveButton
          key={index}
          increase={25}
          removeFunction={() => storeDispatch(deleteItem(cell.frontId))}
        />
      ),
    },
  ]);

  return (
    <Paper
      elevation={2}
      sx={{ padding: "20px", marginBottom: "40px" }}
      key={props.component.frontId}
    >
      <TableContainer>
        <Stack direction="row" flexWrap="wrap" gap="10px">
          {componentParents
            ?.sort((a, b) => a.frontId - b.frontId)
            .map((parent, index) => (
              <Chip
                size="small"
                key={index}
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
          <Chip
            size="small"
            color="default"
            clickable
            label={props.component.label}
          />
        </Stack>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          divider={<Divider flexItem />}
        >
          <FormControlLabel
            control={<Switch />}
            value={showTooltip}
            onChange={() => setShowTooltip(!showTooltip)}
            label="Подсказки"
          />
          <AreaComponentActions
            key={props.component.frontId}
            component={props.component}
            tableHeader={tableHeader}
            setTableHeader={setTableHeader}
          />
        </Stack>
        {props.component.type === ConfigEntityType.List && (
          <AreaList
            head={tableHeader}
            page={page}
            rowsPerPage={rowsPerPage}
            body={props.component as ConfigList}
          />
        )}
        {props.component.type === ConfigEntityType.Select && <AreaSelect />}
        {props.component.type === ConfigEntityType.Input && <AreaInput />}
        {Object.keys(props.component).includes("children") && (
          <TablePagination
            sx={{
              width: "100%",
            }}
            rowsPerPageOptions={[5, 10, 25, 50, 100, 500]}
            component="div"
            count={(props.component as ConfigList).children.length}
            rowsPerPage={rowsPerPage}
            labelRowsPerPage="Строк на странице"
            labelDisplayedRows={({ from, to, count }) =>
              `${from}-${to} из ${count}`
            }
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        )}
      </TableContainer>
    </Paper>
  );
};

const AreaComponentActions: FC<{
  component: ConfigEntity<unknown>;
  tableHeader: TableHeader;
  setTableHeader: Dispatch<SetStateAction<TableHeader>>;
}> = (props) => {
  const storeDispatch = useAppDispatch();
  const addRow = () => {
    storeDispatch(addTableItem(props.component.frontId));
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  return (
    <Stack direction="row" divider={<Divider flexItem />}>
      <IconButton onClick={addRow} color="primary">
        <AddIcon color="primary" />
      </IconButton>
      <IconButton
        color="primary"
        onClick={(event) => setAnchorEl(event.currentTarget)}
      >
        <SettingsIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        {props.tableHeader.map((header, index) => (
          <ListItem key={index}>
            <Stack
              spacing={1}
              direction="row"
              divider={<Divider flexItem orientation="vertical" />}
              alignItems="center"
            >
              <IconButton
                size="small"
                color={header.show ? "primary" : "default"}
                onClick={() =>
                  props.setTableHeader((prevTableHeader) =>
                    prevTableHeader.map((header, i) =>
                      i === index ? { ...header, show: !header.show } : header
                    )
                  )
                }
              >
                {header.show ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </IconButton>
              <Checkbox
                size="small"
                color={!header.disabled ? "primary" : "default"}
                checked={!header.disabled}
                onChange={() =>
                  props.setTableHeader((prevTableHeader) =>
                    prevTableHeader.map((header, i) =>
                      i === index
                        ? { ...header, disabled: !header.disabled }
                        : header
                    )
                  )
                }
              />
              <Typography>{header.label}</Typography>
            </Stack>
          </ListItem>
        ))}
      </Menu>
    </Stack>
  );
};

export default AreaComponent;
