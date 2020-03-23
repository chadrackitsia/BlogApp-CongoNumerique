var express = require("express"),
  mongoose = require("mongoose"),
  bodyParser = require("body-parser"),
  app = express();
  
// CONFIGURATION DE L'APP
mongoose.connect("mongodb://localhost/congonumerique_db"); // Définition du path et Connection à la BDD

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }, { useUnifiedTopology: true }, { useNewUrlParser: true })) //  Parse / analyse de l'application

// Configuration du Model / Mongoose
var blogSchema = new mongoose.Schema({
  title : String,
  image : String,
  body : String,
  created : {type : Date, default: Date.now}
});

var Blog = mongoose.model("Blog", blogSchema); // Définition du nom de Model et du Schema


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

// CREATION (articles) ROUTE
app.post("/blogs", function(req, res){
  // cration d'un article de blog
  Blog.create(req.body.blog, function(err, blogs){
    if(err){
      res.render("new");
    } else {
      //Redirection dans la page d'accueil
      res.redirect("/blogs");
    }
  })

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

