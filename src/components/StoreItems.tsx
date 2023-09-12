import {
  Box,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Drawer,
  Stack,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { StoreFilter } from "./StoreFilter";
import { useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

export interface Store {
  id: string;
  title: string;
  image: string;
  price: number;
  category: string;
  description: string;
  rating: { rate: number; count: number };
}

interface Props {
  storeData: Store[];
  isLoading: boolean;
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

export const StoreItems = ({
  storeData,
  isLoading,
  handleReset,
  filterCategory,
  handleFilterCategory,
}: Props) => {
  const [isDrawerFilterOpen, setIsDrawerFilterOpen] = useState(false);

  // Store Filter Component
  const storeFilterComponent = (
    <StoreFilter
      filterCategory={filterCategory}
      handleFilterCategory={handleFilterCategory}
      handleReset={handleReset}
    />
  );
  // Map Store Items Component
  const storeItemCards = storeData
    // Category Filter
    .filter((i) => {
      if (filterCategory.category.toUpperCase() === "ALL") return i;
      if (i.category === filterCategory.category.toLowerCase()) return i;
    })
    // Search Filter
    .filter((i) => i.title.toLowerCase().includes(filterCategory.search))
    // Star Filter
    .filter((i) => {
      if (filterCategory.starFilter === "AllStar") return i;
      if (Math.ceil(i.rating.rate) === +filterCategory.starFilter) return i;
    })
    .map(({ id, title, image, price, rating }) => {
      return (
        <Card
          component={Link}
          to={id.toString()}
          key={id}
          sx={{
            bgcolor: "primary.main",
            cursor: "pointer",
            textDecoration: "none",
          }}
        >
          <CardMedia
            image={image}
            component="img"
            height="200"
            sx={{ objectFit: "contain", bgcolor: "white", p: 1 }}
          />
          <CardContent sx={{ textAlign: "center" }}>
            <Typography
              sx={{
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                width: "auto",
                overflow: "hidden",
              }}
            >
              {title}
            </Typography>
            <Typography>₱ {Math.ceil(price * 30).toLocaleString()}</Typography>
            <Stack direction="column">
              <Box>
                {Array.from({ length: Math.ceil(rating.rate) }).map((_, i) => (
                  <StarIcon key={i} sx={{ color: "yellow" }} />
                ))}
              </Box>
              {`(${rating.count})`}
            </Stack>
          </CardContent>
        </Card>
      );
    });

  return (
    <Box
      sx={{
        display: "grid",
        gridAutoFlow: "row",
        gridTemplateColumns: { xs: "1fr", md: "auto 1fr" },
        minHeight: "100vh",
      }}
    >
      {/* Filter Drawer for S Screen*/}
      <Drawer
        sx={{ display: { xs: "", md: "none" } }}
        anchor="left"
        open={isDrawerFilterOpen}
        onClose={() => setIsDrawerFilterOpen(false)}
      >
        <Box width="250px" bgcolor="primary.main" sx={{ height: "100%" }}>
          {storeFilterComponent}
        </Box>
      </Drawer>
      {/* Filter Icon for S Screen */}
      {!isLoading && (
        <Stack
          sx={{
            display: { xs: "", md: "none" },
            position: "absolute",
            bgcolor: "primary.main",
            m: 1,
            p: 1,
            borderRadius: 2,
            border: "1px solid red",
            boxShadow: "0 0 9px red",
            cursor: "pointer",
          }}
          onClick={() => setIsDrawerFilterOpen(true)}
        >
          <FilterAltIcon />
        </Stack>
      )}
      {/* Store Filter */}
      <Box bgcolor="primary.main" sx={{ display: { xs: "none", md: "block" } }}>
        {storeFilterComponent}
      </Box>
      {/* Loading */}
      <Box>
        {isLoading && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              paddingTop: "250px",
              minHeight: "100vh",
            }}
          >
            <CircularProgress sx={{ color: "secondary.main" }} />
          </Box>
        )}
        {/* Grid Cards */}
        {storeItemCards.length ? (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            }}
            p={2}
            gap={1}
          >
            {storeItemCards}
          </Box>
        ) : (
          <Box>
            <Typography variant="h5" p={2} textAlign="center">
              No Results Found...
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};
