import StarIcon from "@mui/icons-material/Star";
import { useLoaderData, useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { Store } from "./StoreItems";
import {
  Alert,
  Box,
  Button,
  IconButton,
  Snackbar,
  Stack,
  Typography,
  styled,
} from "@mui/material";

export const CSSInput = styled("input")({
  background: "white",
  textAlign: "center",
  outline: "none",
  border: "none",
  flex: 1,
  width: "50px",
  fontSize: "1rem",
  padding: "10px",
});

export const CSSButton = styled("button")({
  flex: 1,
  background: "red",
  borderRadius: "0",
  fontWeight: "bolder",
  fontSize: "1em",
  border: "none",
  cursor: "pointer",
  padding: "0 10px",
});

interface Props {
  handleAddCartItem: (productData: Store, qty: number) => void;
  quantity: number;
  handleQuantityClick: (data: string) => void;
  handleQuantityInput: (data: React.ChangeEvent<HTMLInputElement>) => void;
  openSB: boolean;
  handleClose: (event: React.SyntheticEvent | Event, reason?: string) => void;
}

export const StoreItem = ({
  handleAddCartItem,
  quantity,
  handleQuantityClick,
  handleQuantityInput,
  openSB,
  handleClose,
}: Props) => {
  const navigate = useNavigate();
  const productData = useLoaderData() as Store,
    { title, price, image, description, rating } = productData;

  return (
    <Stack sx={{ minHeight: "100vh" }} direction={{ xs: "column", md: "row" }}>
      <Box
        component="img"
        src={image}
        height="500px"
        width={{ xs: "100%", md: "40%" }}
        flex={0}
        sx={{ objectFit: "contain", bgcolor: "white", p: 1 }}
      />
      <Box p={2} width={1}>
        {/* Title */}
        <Typography
          variant="h6"
          textAlign="center"
          onClick={() => navigate(-1)}
        >
          {title}
        </Typography>
        {/* Rating */}
        <Stack
          direction="row"
          sx={{
            alignCenter: "center",
            justifyContent: "center",
          }}
        >
          <Box>
            {Array.from({ length: Math.ceil(rating.rate) }).map((_, i) => (
              <StarIcon key={i} sx={{ color: "yellow" }} />
            ))}
          </Box>
          {`(${rating.count})`}
        </Stack>
        {/* Price */}
        <Typography
          variant="h4"
          textAlign="center"
          color="secondary.main"
          fontSize="3rem"
        >
          ₱ {Math.ceil(price * 30).toLocaleString()}
        </Typography>
        {/* Quantity */}
        <Box>
          <Stack
            direction="row"
            sx={{
              width: "100px",
              borderRadius: "10px",
              marginInline: "auto",
            }}
          >
            <CSSButton
              onClick={() => handleQuantityClick("-")}
              sx={{ borderRadius: "10px 0 0 10px" }}
            >
              -
            </CSSButton>
            <CSSInput
              type="number"
              value={quantity}
              min={1}
              max={99}
              onChange={(e) => handleQuantityInput(e)}
            />
            <CSSButton
              onClick={() => handleQuantityClick("+")}
              sx={{ borderRadius: "0 10px 10px 0" }}
            >
              +
            </CSSButton>
          </Stack>
        </Box>
        {/* Buttons */}
        <Stack direction="row" gap={1} my={1}>
          <Button
            variant="contained"
            sx={{
              width: "50%",
              bgcolor: "secondary.main",
              "&:hover": { bgcolor: "secondary.main" },
            }}
            onClick={() => handleAddCartItem(productData, quantity)}
          >
            Add To Cart
          </Button>
          <Button
            variant="contained"
            sx={{
              width: "50%",
              bgcolor: "secondary.main",
              "&:hover": { bgcolor: "secondary.main" },
            }}
          >
            Buy Now
          </Button>
        </Stack>
        {/* Details */}
        <Box>
          <Typography
            variant="h5"
            textAlign="center"
            borderRadius="7px"
            sx={{ marginBottom: 2, border: "1px solid red" }}
          >
            Product Details
          </Typography>
          <Typography variant="body1" textAlign="justify">
            {description}
          </Typography>
        </Box>
      </Box>
      {/* Snackbar */}
      <Snackbar
        open={openSB}
        autoHideDuration={4000}
        onClose={handleClose}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      >
        <Alert severity="error" onClose={handleClose}>
          Item Already In Cart
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export const storeDetailsLoader = async ({ params }: any) => {
  const { id } = params;
  const res = await fetch("https://fakestoreapi.com/products/" + id);
  return res.json();
};
