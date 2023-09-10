import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Box, CssBaseline } from "@mui/material";
import { Footer } from "../components/Footer";

export const RootLayout = () => {
  return (
    <>
      <Box component="nav">
        <CssBaseline />
        <Navbar />
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
