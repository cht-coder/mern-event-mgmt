import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";

const CARD_DATAS = [
  {
    title: "MSFM",
    duration: "2hrs",
    price: 24,
    image: "https://picsum.photos/380/220",
  },
  {
    title: "MSFM",
    duration: "2hrs",
    price: 24,
    image: "https://picsum.photos/380/220",
  },
  {
    title: "MSFM",
    duration: "2hrs",
    price: 24,
    image: "https://picsum.photos/320/180",
  },
];

const Home = () => {
  return (
    <>
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
      <CardsGrid />
    </>
  );
};

export default Home;

const CardsGrid = () => (
  <Grid
    container
    spacing={1}
    px="2.5rem"
    my="5rem"
    justifyContent="space-between"
  >
    {CARD_DATAS.map(({ title, price, duration, image }, i) => (
      <Grid key={i} item>
        <Card>
          <CardMedia
            image={image}
            sx={{
              height: 220,
              width: 380,
              "&:hover": { transform: "scale(1.1)" },
              transition: "1s",
            }}
          />
          <CardContent>
            <Typography textAlign="center">{title}</Typography>
            <Stack
              sx={{
                flexDirection: "row",
                alignItems: "center",
                gap: ".5rem",
                justifyContent: "center",
              }}
            >
              <Typography
                fontWeight={600}
                fontSize="1.05rem"
                textTransform="uppercase"
              >
                {duration}
              </Typography>
              <Typography fontWeight={600} fontSize="1.05rem">
                {price}
              </Typography>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
    ))}
  </Grid>
);
