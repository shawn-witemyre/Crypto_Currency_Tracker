//needed to use const
//jshint esversion: 6

//express, body-parser and request packages
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const path = require("path");

//initalize app
const app = express();

//load view enginer
//npm install pug
//https://www.youtube.com/watch?v=Ad2ngx6CT0M
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(express.static("public"));

//used badyParser to grab data posted to server from html form use urlencoded
app.use(bodyParser.urlencoded({extended: true}));

//sends the /html.html to the homepage
//get request to the "/"
//callback function tells server what to do when the request happens
app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){

  var crypto = req.body.crypto;
  var fiat = req.body.fiat;
  var amount = req.body.amount;

  var baseURL = "https://apiv2.bitcoinaverage.com/indices/global/ticker/";

  var finalURL = baseURL + crypto + fiat;

  // var options = {
  //   url: baseURL,
  //   method: "GET",
  //   //These came from bitcoinaverage api
  //   qs: {
  //     from: crypto,
  //     to: fiat,
  //     amount: amount
  //   }
  // };

  //makes http call to apiv2.bitcoinaverage.com
  //options
  request(finalURL, function(error, response, body){
    // body returns the json JSON.parse converts JSON into javascript object
    var data = JSON.parse(body);
    // console.log(data.display_symbol);
    // var price = data.open.price;
    var today = data.open.day;
    var month = data.open.month;
    var month3 = data.open.month_3;
    var month6 = data.open.month_6;
    var year = data.open.year;

    var conversion = data.display_symbol;
    var time = data.display_timestamp;

    // console.log(price);

    // var currentDate = data.time;

    // res.write("<p>The current date is " + currentDate + "</p>");

    // res.write("<h1>" + amount + " " + crypto + " is currently selling for " + price + " " + fiat+"</h1>");

    // res.send();
    // res.sendFile(__dirname + "/results.html");
    res.render("results", {
      // Date: currentDate,
      Conversion: conversion,
      Time: time,
      valueToday: today,
      valueMonth: month,
      valueMonth3: month3,
      valueMonth6: month6,
      valueYear: year
    });


  });
});

//listens for http requests sent to the server
app.listen(process.env.PORT || 3000, function(){
  console.log("Server us running on port 3000");
});
