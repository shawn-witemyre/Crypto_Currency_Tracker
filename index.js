//needed to use const
//jshint esversion: 6

//express, body-parser and request packages
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

//initalize app
const app = express();

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

  var baseURL = "https://apiv2.bitcoinaverage.com/convert/global";

  var options = {
    url: baseURL,
    method: "GET",
    //These came from bitcoinaverage api
    qs: {
      from: crypto,
      to: fiat,
      amount: amount
    }
  };

  //makes http call to apiv2.bitcoinaverage.com
  request(options, function(error, response, body){
    // body returns the json JSON.parse converts JSON into javascript object
    var data = JSON.parse(body);
    var price = data.price;

    console.log(price);

    var currentDate = data.time;

    res.write("<p>The current date is " + currentDate + "</p>");

    res.write("<h1>" + amount + " " + crypto + " is currently selling for " + price + " " + fiat+"</h1>");

    res.send();
  });
});

//listens for http requests sent to the server
app.listen(process.env.PORT || 3000, function(){
  console.log("Server us running on port 3000");
});
