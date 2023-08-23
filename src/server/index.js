const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

const GEONAMES_USERNAME = process.env.GEONAMES_USERNAME;
const WEATHERBIT_API_KEY = process.env.WEATHERBIT_API_KEY;
const PIXABAY_API_KEY = process.env.PIXABAY_API_KEY;

const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const getGeoNameData = async (req, res) => {
  const responseData = await axios.get(
    `${req.body.BASE_URL}&username=${GEONAMES_USERNAME}`
  );
  res.send(responseData.data);
};

const getWeatherBitData = async (req, res) => {
  const responseData = await axios.get(
    `${req.body.BASE_URL}&key=${WEATHERBIT_API_KEY}`
  );
  res.send(responseData.data);
};

const getPixaBayImage = async (req, res) => {
  const responseData = await axios.get(
    `${req.body.BASE_URL}&key=${PIXABAY_API_KEY}`
  );
  res.send(responseData.data);
};

app.get("/", (_, res) => {
  res.send("./dist/index.html");
});

app.post("/geoNameLocation", getGeoNameData);

app.post("/weatherBitForecast", getWeatherBitData);

app.post("/pixabayImages", getPixaBayImage);

app.post("/search", (req, res) => {
  projectData = req.body;
  res.send(projectData);
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
