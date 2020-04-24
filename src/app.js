const path = require("path");
const express = require("express");
const hbs = require("hbs");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

const publicDirPath = path.join(__dirname, "../public");

const viewsPath = path.join(__dirname, "../templates/views");

const partialsPath = path.join(__dirname, "../templates/partials");

// Setup Handlebars Engine and Views Location
app.set("view engine", "hbs");

app.set("views", viewsPath);

hbs.registerPartials(partialsPath);

app.use(express.static(publicDirPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Anıl Tuluy",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    msg:
      "This site was created by Anıl Tuluy. It uses data from mapbox.com and weatherstack.com.",
    name: "Anıl Tuluy",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    msg: "This message was rendered dynamically!",
    name: "Anıl Tuluy",
  });
});

// Weather Endpoint
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Please provide an address.",
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longtitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(latitude, longtitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          address: req.query.address,
          forecast: forecastData,
          location: location,
        });
      });
    }
  );
});

// Error 404 Page Handler
app.get("*", (req, res) => {
  res.render("error404", {
    title: "Error 404",
    name: "Anıl Tuluy",
    msg: "Page not found.",
  });
});

app.listen(port, () => {
  console.log("Server started on port " + port);
});
