import { Box, Typography } from "@mui/material";

export const Footer = () => {
  return (
    <Box
      sx={{
        width: 1,
        bgcolor: "primary.main",
        py: 1,
        textAlign: "center",
        border: "1px solid red",
        borderLeft: "none",
        borderRight: "none",
      }}
    >
      <Typography color="secondary">
        @ 2023 Shop | All Rights Reserved
      </Typography>
    </Box>
  );
};
