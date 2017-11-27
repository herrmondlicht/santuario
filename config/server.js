var express = require("express");
var bodyParser = require("body-parser");
var consign = require("consign");

//load no server express
var app = express();

//seta engine de view e caminho de onde achar
app.set('view engine', 'ejs');
app.set('views', './views');

//config de parse de json
app.use(bodyParser.urlencoded({
  extended: true,
  limit: '1mb'
}));

//config de parse json para limit
app.use(bodyParser.json({
  limit: '1mb'
}));

//usa o endereço statico de front para css, js etc
app.use(express.static("./front"));

consign().include("routes").include("controllers").include("models").into(app);

module.exports = {app};
