import { Box, Typography } from "@mui/material";

const About = () => {
  return (
    <Box>
      <Typography
        variant="h4"
        sx={{
          textTransform: "uppercase",
          fontWeight: 700,
          my: 2,
          textAlign: "center",
        }}
      >
        About
      </Typography>
    </Box>
  );
};
export default About;
