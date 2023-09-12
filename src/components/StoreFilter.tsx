import {
  Box,
  IconButton,
  InputBase,
  Paper,
  Stack,
  Typography,
  styled,
  ButtonBase,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import DiamondIcon from "@mui/icons-material/Diamond";
import ManIcon from "@mui/icons-material/Man";
import WomanIcon from "@mui/icons-material/Woman";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const CSSBox = styled(Box)(({ theme }) => ({
  border: "1px solid red",
  padding: "20px 0 20px 20px",
  transition: "0.2s",
  width: "100%",
  cursor: "pointer",
  ":hover": { paddingLeft: "50px", color: theme.palette.secondary.main },
}));

const rating = [
  { title: "1 Star", value: 1 },
  { title: "2 Star", value: 2 },
  { title: "3 Star", value: 3 },
  { title: "4 Star", value: 4 },
  { title: "5 Star", value: 5 },
];

interface Props {
  filterCategory: {
    search: string;
    priceSort: { sortActive: boolean; sortAscend: boolean };
    starFilter: string;
    category: string;
  };
  handleFilterCategory: (
    e?: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | null,
    data?: string | null,
    categoryData?: string
  ) => void;
  handleReset: () => void;
}

export const StoreFilter = ({
  filterCategory,
  handleFilterCategory,
  handleReset,
}: Props) => {
  // Price Sort Icon
  const priceIcon =
    filterCategory.priceSort.sortActive &&
    (filterCategory.priceSort.sortAscend ? (
      <ArrowDropUpIcon />
    ) : (
      <ArrowDropDownIcon />
    ));
  // Search - L Screen
  const searchLScreen = (
    <Box sx={{ my: 2, px: 1 }}>
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
          value={filterCategory.search}
          onChange={(e) => handleFilterCategory(e)}
        />
        <IconButton
          aria-label="clear"
          onClick={() => handleFilterCategory(null, "SearchClear")}
        >
          <ClearIcon />
        </IconButton>
      </Paper>
    </Box>
  );

  return (
    <Box sx={{ minHeighteight: "100vh", bgcolor: "primary.main" }}>
      {searchLScreen}
      <Box>
        <Stack
          p={1}
          textAlign="center"
          sx={{
            borderTop: "1px solid red",
            flexDirection: "row",
            justifyContent: "center",
            height: "50px",
            gap: 1,
          }}
        >
          <ButtonBase
            sx={{
              color: "primary.main",
              bgcolor: "secondary.main",
              width: "20%",
              padding: 0,
              height: "100%",
              flex: 1,
              fontSize: "1rem",
              borderRadius: "10px",
            }}
            onClick={() => handleFilterCategory(null, "priceButton")}
          >
            Price{priceIcon}
          </ButtonBase>
          {/* Rating Select */}
          <Box
            component="select"
            sx={{
              outline: "none",
              height: "100%",
              bgcolor: "secondary.main",
              color: "primary.main",
              border: "none",
              fontSize: "1rem",
              flex: 1,
              textAlign: "center",
              borderRadius: "10px",
              cursor: "pointer",
            }}
            value={filterCategory.starFilter}
            onChange={(e) => handleFilterCategory(null, e.target.value)}
          >
            <Box
              component="option"
              value={"AllStar"}
              sx={{ color: "white", border: "none" }}
            >
              Rating
            </Box>
            <Box component="option" value="AllStar">
              All
            </Box>
            {rating.map((rate, i) => (
              <Box component="option" value={rate.value} key={i}>
                {rate.title}
              </Box>
            ))}
          </Box>
          <ButtonBase
            sx={{
              color: "primary.main",
              bgcolor: "secondary.main",
              width: "20%",
              padding: 0,
              height: "100%",
              flex: 1,
              fontSize: "1rem",
              borderRadius: "10px",
            }}
            onClick={handleReset}
          >
            Reset
          </ButtonBase>
        </Stack>
        <Box bgcolor="secondary.main">
          <Typography
            variant="h5"
            p={2}
            textAlign="center"
            color="primary.main"
            fontWeight="bolder"
            letterSpacing={5}
          >
            CATEGORIES
          </Typography>
        </Box>
        <CSSBox
          onClick={(e) =>
            handleFilterCategory(null, null, e.currentTarget.innerText)
          }
          sx={{
            color: filterCategory.category.toUpperCase() === "ALL" ? "red" : "",
            paddingLeft:
              filterCategory.category.toUpperCase() === "ALL" ? "50px" : "",
          }}
        >
          <Stack direction="row" alignItems="center">
            <DoneAllIcon sx={{ marginRight: "5px" }} />
            All
          </Stack>
        </CSSBox>
        <CSSBox
          onClick={(e) =>
            handleFilterCategory(null, null, e.currentTarget.innerText)
          }
          sx={{
            color:
              filterCategory.category.toUpperCase() === "ELECTRONICS"
                ? "red"
                : "",
            paddingLeft:
              filterCategory.category.toUpperCase() === "ELECTRONICS"
                ? "50px"
                : "",
          }}
        >
          <Stack direction="row" alignItems="center">
            <PhoneAndroidIcon sx={{ marginRight: "5px" }} />
            Electronics
          </Stack>
        </CSSBox>
        <CSSBox
          onClick={(e) =>
            handleFilterCategory(null, null, e.currentTarget.innerText)
          }
          sx={{
            color:
              filterCategory.category.toUpperCase() === "JEWELERY" ? "red" : "",
            paddingLeft:
              filterCategory.category.toUpperCase() === "JEWELERY"
                ? "50px"
                : "",
          }}
        >
          <Stack direction="row" alignItems="center">
            <DiamondIcon sx={{ marginRight: "5px" }} />
            Jewelery
          </Stack>
        </CSSBox>
        <CSSBox
          onClick={(e) =>
            handleFilterCategory(null, null, e.currentTarget.innerText)
          }
          sx={{
            color:
              filterCategory.category.toUpperCase() === "MEN'S CLOTHING"
                ? "red"
                : "",
            paddingLeft:
              filterCategory.category.toUpperCase() === "MEN'S CLOTHING"
                ? "50px"
                : "",
          }}
        >
          <Stack direction="row" alignItems="center">
            <ManIcon sx={{ marginRight: "5px" }} />
            Men's Clothing
          </Stack>
        </CSSBox>
        <CSSBox
          onClick={(e) =>
            handleFilterCategory(null, null, e.currentTarget.innerText)
          }
          sx={{
            color:
              filterCategory.category.toUpperCase() === "WOMEN'S CLOTHING"
                ? "red"
                : "",
            paddingLeft:
              filterCategory.category.toUpperCase() === "WOMEN'S CLOTHING"
                ? "50px"
                : "",
          }}
        >
          <Stack direction="row" alignItems="center">
            <WomanIcon sx={{ marginRight: "5px" }} />
            Women's Clothing
          </Stack>
        </CSSBox>
      </Box>
    </Box>
  );
};
