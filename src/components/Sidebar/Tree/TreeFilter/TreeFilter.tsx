import { Autocomplete, TextField } from "@mui/material";
import { FC, useDeferredValue, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../hooks";

import { findRecursiveAll } from "../../../../lib";
import { findSectionByFilter } from "../../../../redux/configSlice";

export const TreeFilter: FC = () => {
  const storeDispatch = useAppDispatch();

  const { sections } = useAppSelector((state) => state.config);
  const [filterText, setFilterText] = useState("");

  const deferredFilterText = useDeferredValue(filterText);

  const allSections = findRecursiveAll(sections);
  const filterOptions = allSections
    .map((option) => option.label.trim())
    .filter(
      (label, index, array) => array.indexOf(label) === index && label.trim()
    );

  useEffect(() => {
    storeDispatch(findSectionByFilter(deferredFilterText));
  }, [deferredFilterText]);

  return (
    <Autocomplete
      options={filterOptions}
      freeSolo
      fullWidth
      autoHighlight
      value={filterText}
      size="small"
      onChange={(_, value) => {
        setFilterText(value as string);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Поиск"
          onInput={({ target }) =>
            setFilterText((target as HTMLInputElement).value)
          }
        />
      )}
    />
  );
};
