const mongoose = require("mongoose");

// *** Définition du path, du nom de la BDD et Connection à la BDD *** //
connectionDB = () => {
  mongoose.connect('mongodb://localhost/congonumerique_db', { 
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, (err) => { // Verification de la connexion avec la BDD
  if (err){
    console.log(err) // Si la connexion echoue
  } else {
    console.log("Connection BDD reussie avec succès !!!") // message de succès
  }
});
};

exports.connectionDB = connectionDB();