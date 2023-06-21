import { Card, CardActions, CardContent, CardHeader } from "@mui/material";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";

const SortBar = (props) => {
  const [sortBy, setSortBy] = useState("");
  const [ascending, setAscending] = useState(false);

  const reset = () => {
    setSortBy("");
    props.reload();
  };

  const handleTitleSortClick = () => {
    if (sortBy !== "title") {
      setSortBy("title");
      props.handleSorting("title", ascending);
    } else {
      reset();
    }
  };

  const handleUserNameSortClick = () => {
    if (sortBy !== "username") {
      setSortBy("username");
      props.handleSorting("username", ascending);
    } else {
      reset();
    }
  };

  const handlePostedDateClick = () => {
    if (sortBy !== "created") {
      setSortBy("created");
      props.handleSorting("created", ascending);
    } else {
      reset();
    }
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
