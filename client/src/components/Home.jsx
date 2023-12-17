import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";

const Home = () => {
  return (
    <Box sx={{ minHeight: "100vh", display: "grid", placeContent: "center" }}>
      <Box>
        <Typography variant="h5" sx={{ mx: "auto", textAlign: "center" }}>
          Welcome To Marraige Events Planner
        </Typography>
      </Box>
      <Stack
        sx={{
          flexDirection: "row",
          my: 5,
          gap: "2.5rem",
          justifyContent: "center",
          "& .MuiButton-root": { width: "12.5rem" },
        }}
      >
        <Button variant="contained" color="success" href="/login">
          Login
        </Button>
        <Button variant="contained" color="success" href="/register">
          Register
        </Button>
      </Stack>
    </Box>
  );
};

export default Home;
