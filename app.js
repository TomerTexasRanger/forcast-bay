const express = require("express");
const app = express();
const cors = require("cors");
const axios = require("axios");
const http = require("http").Server(app);
const path = require("path");

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});
app.use(express.static(path.join(__dirname, "/Assets")));

app.get("/find/:loc", async (req, res) => {
  let location = req.params.loc;
  if (!location) return res.status(400).send("No location entered");
  let geoUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=pk.eyJ1IjoidG9tZXJzYXAiLCJhIjoiY2tqcmU1NHkxMXVtaTJzbDk4ejVzdmg5eSJ9.QqKRMOf1vWI_FirtKgt9dg`;

  try {
    let data = await axios.get(geoUrl);
    let coors = data.data.features;
    res.json(coors);
  } catch (error) {
    console.log(error);
  }
});

app.get("/find/forcast/:coor", async (req, res) => {
  let coor = req.params.coor;
  console.log(coor);
  let weatherUrl = `http://api.weatherstack.com/current?access_key=fc5a40f2c6d71634bd57182e9dcce213&query=${coor}`;
  let weatherData = await axios.get(weatherUrl);
  res.json(weatherData.data);
});

const port = process.env.PORT || 3000;

http.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
