import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  InputAdornment,
  Paper,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import {
  addPictures,
  changeImage,
  toggleModal,
} from "../../../redux/configSlice";
import { useAppDispatch, useAppSelector, useFetch } from "../../../hooks";
import { useDeferredValue, useEffect, useState } from "react";

import { Picture } from "../../../@types";
import RefreshIcon from "@mui/icons-material/Refresh";
import SearchIcon from "@mui/icons-material/Search";

const ImgModal = () => {
  const { img } = useAppSelector((state) => state.config.modals);
  const { pictures } = useAppSelector((state) => state.config);

  const { fetchedData, loading } = useFetch(
    "https://delmard.ru/api/cfg/get/pictures/",
    {
      method: "POST",
      headers: {
        Authorization: "Bearer eo)d/sKMczFuapV-E2SR4cqDjywR",
        "Content-Type": "application/json",
      },
    },
    [pictures],
    pictures?.length === 0
  );

  useEffect(() => {
    if (fetchedData) {
      storeDispatch(addPictures(fetchedData));
    }
  }, [fetchedData]);

  const [filterText, setFilterText] = useState("");

  const deferredFilterText = useDeferredValue(filterText);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const storeDispatch = useAppDispatch();
  const handleFilter = (item: Picture, index: number) => {
    if (
      item.UF_NAME.toLowerCase().includes(deferredFilterText.toLowerCase()) ||
      item.UF_FILE.ORIGINAL_NAME.toLowerCase().includes(
        deferredFilterText.toLowerCase()
      )
    ) {
      return item;
    }
  };

  return (
    <Dialog
      open={img.isOpen}
      maxWidth="lg"
      fullWidth
      onClose={() =>
        storeDispatch(
          toggleModal({
            element: 0,
            type: "img",
            isOpen: false,
          })
        )
      }
    >
      <DialogTitle>
        <Stack
          direction="row"
          justifyContent="space-between"
          divider={<Divider flexItem />}
        >
          <Typography variant="h5">Выбрать изображение</Typography>
          <Stack
            alignItems="center"
            direction="row"
            spacing={1}
            divider={<Divider flexItem orientation="vertical" />}
          >
            {loading ? (
              <CircularProgress size={24} />
            ) : (
              <IconButton onClick={() => storeDispatch(addPictures([]))}>
                <RefreshIcon />
              </IconButton>
            )}
            <TextField
              onChange={(e) => {
                setFilterText(e.target.value);
                setPage(0);
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              variant="standard"
            />
          </Stack>
        </Stack>
      </DialogTitle>
      <DialogContent
        sx={{
          overflow: "hidden",
        }}
      >
        <TableContainer
          sx={{ maxHeight: "520px", overflow: "auto", height: "100%" }}
          component={Paper}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Изображение</TableCell>
                <TableCell>Название</TableCell>
                <TableCell>Оригинальное название</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading
                ? Array.from({ length: 10 }).map((_, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Skeleton
                          variant="rectangular"
                          height={100}
                          width={100}
                        />
                      </TableCell>
                      <TableCell>
                        <Skeleton width="100%" />
                      </TableCell>
                      <TableCell>
                        <Skeleton width="100%" />
                      </TableCell>
                    </TableRow>
                  ))
                : pictures
                    ?.filter(handleFilter)
                    .slice(page * rowsPerPage, rowsPerPage + rowsPerPage * page)
                    .map((item, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          cursor: "pointer",
                          "&:hover": {
                            backgroundColor: "rgba(0, 0, 0, 0.05)",
                          },
                        }}
                        onClick={() => {
                          storeDispatch(
                            changeImage({
                              id: img.element,
                              picture: item.ID,
                            })
                          );
                          storeDispatch(
                            toggleModal({
                              element: 0,
                              type: "img",
                              isOpen: false,
                            })
                          );
                        }}
                      >
                        <TableCell>
                          <img
                            src={"https://delmard.ru/" + item.UF_FILE.SRC}
                            alt={item.UF_NAME}
                            width={100}
                            height={100}
                          />
                        </TableCell>
                        <TableCell>{item.UF_NAME}</TableCell>
                        <TableCell>{item.UF_FILE.ORIGINAL_NAME}</TableCell>
                      </TableRow>
                    ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          count={pictures?.filter(handleFilter).length || 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onRowsPerPageChange={(event) => {
            setRowsPerPage(parseInt(event.target.value, 10));
            setPage(0);
          }}
          labelRowsPerPage="Строк на странице"
          labelDisplayedRows={({ from, to, count }) =>
            `${from}-${to} из ${count}`
          }
          onPageChange={(_, newPage) => setPage(newPage)}
          rowsPerPageOptions={[10, 25, 50, 100, 500]}
          component="div"
        />
      </DialogContent>

      <DialogActions>
        <Button
          onClick={() =>
            storeDispatch(
              toggleModal({
                type: "img",
                element: 0,
                isOpen: false,
              })
            )
          }
        >
          Закрыть
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ImgModal;
