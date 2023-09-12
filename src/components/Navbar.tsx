import {
  AppBar,
  Box,
  Button,
  Toolbar,
  IconButton,
  Badge,
  Drawer,
  Typography,
  Stack,
  Divider,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import StorefrontIcon from "@mui/icons-material/Storefront";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import { useState } from "react";
import { CartItem } from "../App";
import { CSSButton, CSSInput } from "./StoreItem";

interface Props {
  cartItems: CartItem[];
  handleCartItemQuantity: (item: CartItem, data: string) => void;
  handleCartItemQuantityInput: (
    item: CartItem,
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  handleRemoveCartItem: (productID: string) => void;
}

export const Navbar = ({
  cartItems,
  handleCartItemQuantity,
  handleCartItemQuantityInput,
  handleRemoveCartItem,
}: Props) => {
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);

  // Cart Drawer
  const cartDrawer = (
    <Drawer
      anchor="right"
      open={isCartDrawerOpen}
      onClose={() => setIsCartDrawerOpen(false)}
    >
      <Box width="250px">
        {/* Cart Header */}
        <Stack direction="row" alignItems="center">
          <Typography flexGrow={1} p={2} variant="h5">
            Cart Items
          </Typography>
          <IconButton onClick={() => setIsCartDrawerOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Stack>
        {/* Button */}
        <Box sx={{ px: 1, width: "100%" }}>
          <Button
            sx={{
              bgcolor: "secondary.main",
              fontWeight: "bolder",
              "&:hover": {
                bgcolor: "secondary.main",
              },
            }}
            fullWidth
          >
            Check Out
          </Button>
          {/* Overall Total Price */}
          <Box sx={{ marginTop: 0.5 }}>
            <Typography
              variant="h5"
              textAlign="center"
              sx={{ bgcolor: "primary.main" }}
            >
              Overall Total Price
            </Typography>
            <Typography
              variant="h6"
              textAlign="center"
              sx={{ border: "2px solid black" }}
            >
              ₱{" "}
              {Math.ceil(
                cartItems.reduce(
                  (a, c) => (a + c.details.price * 30) * c.quantity,
                  0
                )
              ).toLocaleString()}
            </Typography>
          </Box>
          {/* Number of Items */}
          <Typography variant="body1" textAlign="center">
            # of Items In Cart: {cartItems.reduce((a, c) => a + c.quantity, 0)}
          </Typography>
          <Divider />
          <Box>
            {cartItems.map((item) => (
              <Box
                key={item.details.id}
                sx={{ border: "2px solid black", marginBottom: 1 }}
              >
                <Box position="relative">
                  <IconButton
                    sx={{
                      position: "absolute",
                      zIndex: 2,
                      color: "primary.main",
                      top: 0,
                      right: 0,
                      "&:hover": {
                        color: "secondary.main",
                      },
                    }}
                    onClick={() => handleRemoveCartItem(item.details.id)}
                  >
                    <CloseIcon />
                  </IconButton>
                  <Box
                    component="img"
                    src={item.details.image}
                    width={1}
                    height="100px"
                    sx={{ objectFit: "contain", bgcolor: "white", p: 1 }}
                  />
                </Box>
                <Box textAlign="center">
                  <Typography
                    variant="body1"
                    component={Link}
                    to={`store/${item.details.id}`}
                    sx={{
                      textDecoration: "none",
                      color: "yellow",
                      "&:hover": {
                        textDecoration: "underline",
                      },
                    }}
                  >
                    {item.details.title}
                  </Typography>
                </Box>
                <Stack
                  direction="row"
                  px={1}
                  sx={{
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  {/* Price */}
                  <Box>
                    <Typography variant="h6">
                      ₱ {Math.ceil(item.details.price * 30).toLocaleString()}
                    </Typography>
                  </Box>
                  <Typography>x</Typography>
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
                        onClick={(e) =>
                          handleCartItemQuantity(
                            item,
                            e.currentTarget.innerText
                          )
                        }
                        sx={{ borderRadius: "10px 0 0 10px", padding: "0 5px" }}
                      >
                        -
                      </CSSButton>
                      <CSSInput
                        type="number"
                        value={item.quantity}
                        min={1}
                        max={99}
                        onChange={(e) => handleCartItemQuantityInput(item, e)}
                        sx={{ padding: "2px", width: "40px" }}
                      />
                      <CSSButton
                        onClick={(e) =>
                          handleCartItemQuantity(
                            item,
                            e.currentTarget.innerText
                          )
                        }
                        sx={{
                          borderRadius: "0 10px 10px 0",
                          padding: "0 5px",
                        }}
                      >
                        +
                      </CSSButton>
                    </Stack>
                  </Box>
                </Stack>
                <Divider />
                <Stack direction="row" justifyContent="space-between" px={1}>
                  <Typography variant="h6">Total Price:</Typography>
                  <Typography variant="h6" color="yellow">
                    ₱{" "}
                    {(
                      Math.ceil(item.details.price * 30) * item.quantity
                    ).toLocaleString()}
                  </Typography>
                </Stack>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
  // Buttons - L Screen
  const buttonsLScreen = (
    <Box sx={{ display: "flex" }}>
      <Button color="secondary" component={Link} to="/">
        Home
      </Button>
      <Button color="secondary" component={Link} to="store">
        Store
      </Button>
      <Button color="secondary" component={Link} to="about">
        About
      </Button>
    </Box>
  );

  return (
    <AppBar position="static">
      <Toolbar sx={{ bgcolor: "primary.main" }}>
        {/* Logo */}
        <Box flexGrow={1}>
          <Button
            variant="text"
            disableRipple
            color="secondary"
            sx={{
              fontWeight: "bolder",
              fontSize: "1.5rem",
              ":hover": {
                color: "secondary.main",
              },
            }}
          >
            <StorefrontIcon sx={{ fontSize: "2.5rem" }} />
            Shop
          </Button>
        </Box>
        {/* Cart */}
        <IconButton
          sx={{ "&:hover": { color: "white" } }}
          onClick={() => setIsCartDrawerOpen(true)}
        >
          <Badge
            badgeContent={cartItems.reduce((a, c) => a + c.quantity, 0)}
            color="secondary"
          >
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
        {/* Cart Drawer */}
        {cartDrawer}
      </Toolbar>
      {/* 2nd Toolbar */}
      <Toolbar
        variant="dense"
        sx={{
          bgcolor: "primary.main",
          border: "1px solid red",
          borderLeft: "none",
          borderRight: "none",
          justifyContent: "center",
        }}
      >
        {/* Buttons - L Screen*/}
        {buttonsLScreen}
      </Toolbar>
    </AppBar>
  );
};
