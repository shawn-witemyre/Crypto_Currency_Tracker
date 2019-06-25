//jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
  // console.log(req.body.crypto);

  var crypto = req.body.crypto;
  var fiat = req.body.fiat;

  var cryptoFiat = crypto + fiat;

   // https://apiv2.bitcoinaverage.com/indices/global/ticker/BTCUSD

  request("https://apiv2.bitcoinaverage.com/indices/global/ticker/" + cryptoFiat, function(error, response, body){
    // converts JSON into javascript object
    var data = JSON.parse(body);
    var price = data.last;

    var currentDate = data.display_timestamp;

    res.write("<p>The current date is " + currentDate + "</p>");

    res.write("<h1>The price of " + crypto + " is " + price + " " + fiat+"</h1>");

    res.send();
  });
});

app.listen(3000, function(){
  console.log("Server us running on port 3000");
});
