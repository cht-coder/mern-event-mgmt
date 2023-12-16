import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Carousel } from "react-bootstrap";

import "./styles/home.css";

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
      <div className="home-container">
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://placekitten.com/1200/400"
              alt="First slide"
            />
            <Carousel.Caption>
              <h3>MARRIAGE EVENT PLANNER</h3>
              <p>HEARTY WELCOME</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://placekitten.com/1200/401"
              alt="Second slide"
            />
            <Carousel.Caption>
              <h3>JOURNEY TO JOYFUL UNION</h3>
              <p>BE A HAPPY COUPLE</p>
            </Carousel.Caption>
          </Carousel.Item>
          {/* Add more Carousel.Items for additional slides */}
        </Carousel>
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
      </div>
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
