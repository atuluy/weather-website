const request = require("postman-request");

const forecast = (latitude, longtitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=93a699da5c2d736e52f5bfa1adcc0d9c&query=" +
    latitude +
    "," +
    longtitude +
    "&units=m";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather services!", undefined);
    } else if (body.error) {
      callback("Unable to retrieve the location", undefined);
    } else {
      callback(
        undefined,
        `In ${body.location.name}, it is currently ${body.current.temperature} degrees. It is ${body.current.weather_descriptions[0]}.`
      );
    }
  });
};

module.exports = forecast;
