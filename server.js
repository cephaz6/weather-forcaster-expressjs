const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const { request } = require("http");
const app = express();

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});
app.post("/", function(req, res) {
    tempUnit = req.body.tempUnit;
    cityName = req.body.cityName;

    let apiKey = "495f4901ef773c5e8433e396988ff348";
    let url =
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        cityName +
        "&appid=" +
        apiKey +
        "&units=" +
        tempUnit +
        "";
    https.get(url, function(response) {
        response.on("data", function(data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            let description = weatherData.weather[0].description;
            let imagescr = weatherData.weather[0].icon;
            res.write("<p>" + description + "</p>");
            res.write(
                "<h1>The temeperature in " +
                cityName +
                " is " +
                temp +
                " degree celcius</h1>"
            );
            res.write(
                "<img width='100px' height='100px' src='https://openweathermap.org/img/wn/" +
                imagescr +
                ".png'>"
            );
            res.send();
        });
    });
});

app.listen(3000, function() {});