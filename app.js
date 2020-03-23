var express = require("express"),
  mongoose = require("mongoose"),
  bodyParser = require("body-parser"),
  connectionDB = require("./controllers/connexionDB"), // Module connection DB
  modelDB = require("./controllers/modelDB"),
  app = express();
  
// ***** CONFIGURATION DE L'APP ****** //

app.connect(connectionDB); // Configuration App avec Module connection DB

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true })); //  Parse / analyse de l'application


// Configuration Schema
var blogSchema = new mongoose.Schema({
  title : {
    type :String
  },
  image : {
    type :String
  },
  body : {
    type :String
  },
  created : {
    type : Date, default: Date.now
  }
});

var Blog = mongoose.model("Blog", blogSchema); // Définition du nom de Model et Accès au Schema "blogSchema"


// RESTfull ROUTES

app.get("/", function(req, res){
  res.redirect("/blogs");
})

// INDEX ROUTE - BLOG 
app.get("/blogs", function(req, res){
  Blog.find({}, function(err, blogs){ // Recherche des articles dans la base de données
    if(err){
      console.log("ERROR!!!")
    } else {
      res.render("index", {blogs: blogs});
    }
  });
});

// ROUTE - Ajouter un nouvel article
app.get("/blogs/new", function(req, res){
  res.render("new")
});

// CREATION (articles) ROUTE+
app.post("/blogs", function(req, res){
  // cration d'un article de blog req.body.blog
  Blog.create(req.body.blog, function(err, blog){
    if(err){
      res.render("new");
    } else {
      //Redirection dans la page d'accueil
      res.redirect("/blogs");
      console.log("Nouveau article ajouté :");
      console.log(blog)
    }
  });

});


// ROUTES APERCU ARTICLE
app.get("/blogs/:id", function(req, res){
  res.send("SHOW PAGE");
});









app.listen(8080, function(err){
  if(err) {
    console.log(err)
  } else {
    console.log("Server started...")
  }
});

