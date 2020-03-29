const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs'); 
const passport = require('passport');

// User model
const User = require('../models/Users');


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


/***  Route inscription des utilisateurs - POST ROUTE
      Verification de tous les champs, de deux mots de passe saisis sur le formulaire
      et du nombre des caractères du mot de passe ***/
router.post('/users/inscription', (req, res) => {
  const { name, email, password, password2} = req.body;
  let errors = [];


  // Vérification des champs
  if(!name || !email || !password || !password2){
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
    res.render('users/inscription', { 
      errors, 
      name, 
      email, 
      password, 
      password2
    });
  } else {
    // Validation des inputs
    User.findOne({ email: email})
      .then(user => {
        if(user){
          // Si l'utilisateur existe
          errors.push({msg : "L'adresse email saisie existe déjà"});
          res.render('users/inscription', { 
            errors, 
            name, 
            email, 
            password, 
            password2
          });
        } else {
          const newUser = new User({
            name,
            email,
            password
          });

          // Hashage du mot de passe avec le module BcryptJS
          bcrypt.genSalt(10, (err, salt) => 
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if(err) throw err;

              // Hasher le mot de passe
              newUser.password = hash;
              //Enregistrement du compte utilisateur
              newUser.save()
              .then(user => {
                req.flash('success_msg', 'Vous êtes maintenant inscrit ou vous pouvez vous connecter !');
                res.redirect('connexion')
              })
              .catch(err => console.log(err));
          }) )
        }
      });
  }

});


// *********************  CONNEXION DES USERS - POST ROUTE  *******************/
router.post('/users/connexion', (req, res, next) =>  {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/connexion',
    failureFlash: true,
  })(req, res, next);
})


// *********************  DECONNECTION UTILISATEUR  *******************/
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'Vous êtes deconnecté');
  res.redirect('/users/connexion');
});


module.exports = router;