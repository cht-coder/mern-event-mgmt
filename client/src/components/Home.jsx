import { Button, Stack } from "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Carousel } from "react-bootstrap";

import "./styles/home.css";

const Home = () => {
  return (
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
  );
};

export default Home;
