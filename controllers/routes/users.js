const express = require('express');

const router = express.Router();


// Page d'inscription
router.get('/users/inscription', (req, res)=> {
  res.render('./users/inscription');
});

// Page de Connexion
router.get('/users/connexion',  (req, res) => {
  res.render('./users/connexion');
});

// Redirection à la page connection
router.get('/users', (req, res)=> {
  res.redirect('./users/connexion');
});


/***  Route inscription des utilisateurs - POST METHOD
      
*****/
router.post('/users/inscription', (req, res) => {
  const { name, email, password, password2} = req.body;
  let errors = [];


  // Vérification des champs
  if(!name || !email || !password || password2){
    errors.push({msg : "Veuillez remplir tous les champs"});
  }

  // Vérification si les mots de passe saisis sont identiques
  if(password !== password2){
    errors.push({msg : "Les mots de passe saisis ne sont pas identiques !"});
  }

  // Véfication de la longueur de caractès du mot de passe
  if (password.length < 6) {
    errors.push({msg : "Le mot de passe doit avoir plus de 6 caractères"});
  }

  if(errors.length > 0 ) {
    
  } else {
    res.send("Pass !")
  }

});

module.exports = router;