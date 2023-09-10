import { Box, IconButton, InputBase, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

const categories = [
  "All",
  "Electronics",
  "Jewelery",
  "Men's Clothes",
  "Woman's Clothes",
];
interface Props {
  searchData: string;
  setSearchData: React.Dispatch<React.SetStateAction<string>>;
}
export const StoreFilter = ({ searchData, setSearchData }: Props) => {
  // Search - L Screen
  const searchLScreen = (
    <Box sx={{ my: 2 }}>
      <Paper
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 5,
        }}
        elevation={0}
      >
        <IconButton aria-label="search">
          <SearchIcon />
        </IconButton>
        <InputBase
          placeholder="Search...."
          sx={{ flex: 1 }}
          value={searchData}
          onChange={(e) => setSearchData(e.target.value.toLowerCase())}
        />
        <IconButton aria-label="clear">
          <ClearIcon />
        </IconButton>
      </Paper>
    </Box>
  );

  return (
    <Box sx={{ minHeighteight: "100vh", bgcolor: "primary.main", px: 1 }}>
      {searchLScreen}
    </Box>
  );
};
