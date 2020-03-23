mongoose = require("mongoose");

// *** Définition du path, du nom de la BDD et Connection à la BDD *** //
connectionDB = function() {
  mongoose.connect('mongodb://localhost/congonumerique_db', { 
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, function(err){ // Verification de la connexion avec la BDD
  if (err){
    console.log(err) // Si la connexion echoue
  } else {
    console.log("Connection BDD reussie avec succès !!!")
  }
});
};




exports.connectionDB = connectionDB();