var express = require("express"),
  mongoose = require("mongoose"),
  bodyParser = require("body-parser"),
  app = express();

// Connection à la BDD  
mongoose.connect("mongodb://localhost/congonumerique_db");

app.set("vieuw engine", "ejs");

