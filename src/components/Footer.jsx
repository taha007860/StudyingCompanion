import React from "react";
import { Box, Container, Typography } from "@mui/material";

function Footer() {
  return (
    <Box sx={{ bgcolor: "#fafafa", py: 3 }}>
      <Container maxWidth="sm">
        <Typography variant="body2" color="text.secondary" align="center">
          &copy; {new Date().getFullYear()} Task Manager
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;