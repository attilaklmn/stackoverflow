import { Card, CardContent } from "@mui/material";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Fragment } from "react";
import SearchBar from "./SearchBar";

let sortBy = "";
let ascending = false;
let searchFieldText = "";

const SortBar = (props) => {
  const handleSortClick = (propertyToSortBy) => {
    if (sortBy !== propertyToSortBy) {
      sortBy = propertyToSortBy;
      manageSortAndSearch();
    } else {
      sortBy = "";
      manageSortAndSearch();
    }
  };

  const handleAscendingClick = () => {
    let prevAscending = ascending;
    ascending = !prevAscending;
    if (sortBy) {
      manageSortAndSearch();
    }
  };

  const handleSearchFieldChange = (fieldText) => {
    searchFieldText = fieldText;
    manageSortAndSearch();
  };

  const manageSortAndSearch = () => {
    const params = new URLSearchParams();
    if (sortBy) {
      params.append("sort_by", sortBy);
      params.append("ordering", ascending ? "true" : "false");
    }
    if (searchFieldText) {
      params.append("search", searchFieldText);
    }
    if (!sortBy && !searchFieldText) {
      props.reload();
    } else {
      const queryString = params.toString();
      props.handleSortAndSearch(queryString);
    }
  };

  return (
    <Fragment>
      <SearchBar onFieldChange={handleSearchFieldChange} />
      <Card sx={{ minWidth: "75%", maxWidth: "80%", margin: 2 }}>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Stack direction="row" spacing={2}>
            <Button
              variant={sortBy === "title" ? "contained" : "outlined"}
              onClick={() => handleSortClick("title")}
            >
              Title
            </Button>
            <Button
              variant={sortBy === "username" ? "contained" : "outlined"}
              onClick={() => handleSortClick("username")}
            >
              Username
            </Button>
            <Button
              variant={sortBy === "created" ? "contained" : "outlined"}
              onClick={() => handleSortClick("created")}
            >
              Date
            </Button>
            <Button
              variant={sortBy ? "contained" : "outlined"}
              onClick={handleAscendingClick}
            >
              {ascending ? "asc" : "desc"}
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Fragment>
  );
};

export default SortBar;
