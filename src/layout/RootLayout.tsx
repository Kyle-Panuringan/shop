import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Box, CssBaseline } from "@mui/material";
import { Footer } from "../components/Footer";
import { CartItem } from "../App";

interface Props {
  cartItems: CartItem[];
  handleCartItemQuantity: (item: CartItem, data: string) => void;
  handleCartItemQuantityInput: (
    item: CartItem,
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  handleRemoveCartItem: (productID: string) => void;
}
export const RootLayout = ({
  cartItems,
  handleCartItemQuantity,
  handleCartItemQuantityInput,
  handleRemoveCartItem,
}: Props) => {
  return (
    <>
      <Box component="nav">
        <CssBaseline />
        <Navbar
          cartItems={cartItems}
          handleCartItemQuantity={handleCartItemQuantity}
          handleCartItemQuantityInput={handleCartItemQuantityInput}
          handleRemoveCartItem={handleRemoveCartItem}
        />
      </Box>
      <Box component="main">
        <Outlet />
      </Box>
      <Box component="footer">
        <Footer />
      </Box>
    </>
  );
};
