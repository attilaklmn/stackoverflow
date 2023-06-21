import { TextField } from "@mui/material";

const SearchBar = (props) => {
  const handleSearchFieldChange = (e) => {
    props.onFieldChange(e.target.value);
  };

  return (
    <TextField
      sx={{
        margin: 1,
        width: "75%",
        input: { textAlign: "center" },
      }}
      id="outlined-basic"
      label="Search for questions"
      variant="outlined"
      onChange={handleSearchFieldChange}
    />
  );
};

export default SearchBar;
