import { Card, CardActions, CardContent, CardHeader } from "@mui/material";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useState } from "react";

const SortBar = (props) => {
  const [sortBy, setSortBy] = useState("");
  const [ascending, setAscending] = useState(false);

  const reset = () => {
    setSortBy("");
    props.reload();
  };

  const manageSorting = (propertyToSortBy) => {
    if (sortBy !== propertyToSortBy) {
      setSortBy(propertyToSortBy);
      props.handleSorting(propertyToSortBy, ascending);
    } else {
      reset();
    }
  };

  const handleTitleSortClick = () => {
    manageSorting("title");
  };

  const handleUserNameSortClick = () => {
    manageSorting("username");
  };

  const handlePostedDateClick = () => {
    manageSorting("created");
  };

  const handleAscendingClick = () => {
    let prevAscending = ascending;
    setAscending(!prevAscending);
    if (sortBy) {
      props.handleSorting(sortBy, !prevAscending);
    }
  };

  return (
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
            onClick={handleTitleSortClick}
          >
            Title
          </Button>
          <Button
            variant={sortBy === "username" ? "contained" : "outlined"}
            onClick={handleUserNameSortClick}
          >
            Username
          </Button>
          <Button
            variant={sortBy === "created" ? "contained" : "outlined"}
            onClick={handlePostedDateClick}
          >
            Date
          </Button>
          <Button variant={"contained"} onClick={handleAscendingClick}>
            {ascending ? "asc" : "desc"}
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default SortBar;
