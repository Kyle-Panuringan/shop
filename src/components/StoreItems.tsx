import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Stack,
} from "@mui/material";
import { Link, useLoaderData } from "react-router-dom";
import { StoreFilter } from "./StoreFilter";
import { useState } from "react";

export interface Store {
  id: string;
  title: string;
  image: string;
  price: number;
}

export const StoreItems = () => {
  const store = useLoaderData() as Store[];
  const [searchData, setSearchData] = useState("");

  return (
    <Box
      sx={{
        display: "grid",
        gridAutoFlow: "row",
        gridTemplateColumns: "auto 1fr",
        minHeight: "100vh",
      }}
    >
      <Box bgcolor="primary.main">
        <StoreFilter searchData={searchData} setSearchData={setSearchData} />
      </Box>
      <Box>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          }}
          p={2}
          gap={1}
        >
          {store
            .filter((i) => i.title.toLowerCase().includes(searchData))
            .map(({ id, title, image, price }) => {
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
                  <CardContent>
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
                    <Typography>
                      ₱ {Math.ceil(price * 30).toLocaleString()}
                    </Typography>
                  </CardContent>
                </Card>
              );
            })}
        </Box>
      </Box>
    </Box>
  );
};

export const storeLoader = async () => {
  const res = await fetch("https://fakestoreapi.com/products");
  return res.json();
};
