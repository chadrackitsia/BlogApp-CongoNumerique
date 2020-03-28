var express = require("express"),
  expressSanitizer = require("express-sanitizer"),
  mongoose = require("mongoose"),
  bodyParser = require("body-parser"),
  methodOverride = require("method-override"),
  connectionDB = require("./models/connexionDB"), // Module connection DB
  app = express();
  
// ***** CONFIGURATION DE L'APP ****** //

app.connect(connectionDB); // Configuration App avec Module connection DB
mongoose.set('useFindAndModify', false); // fonction du pilote MongoDB - Deprecation Warnings

app.set("view engine", "ejs"); // EJS
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true })); //  Parse / analyse de l'application
app.use(expressSanitizer());
app.use(methodOverride("_method"));


// Configuration BLOG Schema
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

// ROUTE ***** CREATION ARTICLES *****
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


// ROUTE *** RECHERCHE ID & AFFICHAGE DE L'ARTICLE ****
app.get("/blogs/:id", function(req, res){
  Blog.findById(req.params.id, function(err, foundBlog){
    if(err){
      // Redirection sur la page blogs "Accueil"
      res.redirect("/blogs");
    } else {
      res.render("show", {blog: foundBlog});
    }
  })
});

// ROUTE **** RECHERCHE & MODIFICATION ARTICLE ****
app.get("/blogs/:id/edit", function(req, res){
  Blog.findById(req.params.id, function(err, foundBlog){ // Rercheche de l'article par son ID
    if(err){                    // Si ID n'existe pas, rediriger vers la page Blogs "Accueil"
      res.redirect("/blogs");
    } else {                   // Sinon,  retourner et afficher dans le formulaire les informations concernant l'ID
      res.render("edit", {blog: foundBlog});
    }
  })
})

// ROUTE **** MISE A JOUR ARTICLE APRES MODIFICATION ****
app.put("/blogs/:id", function(req, res){
  // Recherche ID et Mise à jour des contenus
  Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
    if(err){
      res.redirect("/blogs");
    } else {
      res.redirect("/blogs/" + req.params.id);
    }
  });
});

// ROUTE **** SUPPRESSION ARTICLE ****
app.delete("/blogs/:id", function(req, res){
  // Suppression de l'article
  Blog.findByIdAndRemove(req.params.id, function(err){
    if(err){
      res.redirect("/blogs/");
    } else {
      res.redirect("/blogs/");
    }
  })
  // Redirection
});


// ************* AUTHENTIFICATION - PASSPORT *************** //


app.get('/users/inscription', require('./controllers/routes/users')); // GET ROUTEinscription

app.get('/users/connection', require('./controllers/routes/users')); // GET ROUTE Connection

app.post('/users/inscription', require('./controllers/routes/users')); // POST ROUTE Inscription des utilisateurs




// ************* APPEL & DEMARRAGE DU SERVEUR PAR LE PORT "8080" *************** //
app.listen(8080, function(err){
  if(err) {
    console.log(err)
  } else {
    console.log("Server started...")
  }
});

