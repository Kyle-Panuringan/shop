import { AppBar, Box, Button, Toolbar, IconButton, Badge } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import StorefrontIcon from "@mui/icons-material/Storefront";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";

export const Navbar = () => {
  // Buttons - L Screen
  const buttonsLScreen = (
    <Box sx={{ display: { xs: "none", md: "flex" } }}>
      <Button color="secondary" component={Link} to="/">
        Home
      </Button>
      <Button color="secondary" component={Link} to="store">
        Store
      </Button>
      <Button color="secondary" component={Link} to="/">
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
        <IconButton sx={{ "&:hover": { color: "white" } }}>
          <Badge badgeContent={1} color="secondary">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
        {/* Menu Button for S Screen */}
        <IconButton
          sx={{
            display: { xs: "block", md: "none" },
            marginLeft: "15px",
            "&:hover": { color: "white" },
          }}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
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
