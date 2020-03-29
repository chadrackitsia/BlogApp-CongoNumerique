const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Chargement User Model
const User = require('../models/Users');

module.exports = function(passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'email'}, (email, password, done) => {
        // Veerification user
        User.findOne({ email: email})
        .then(user => {
            if(!user){
                return done(null, false, { message : "L'adresse email saisie n'existe pas"})
            }

            // Vérification du mot de passe
            bcrypt.compare(password, user.password, (err, isMatch) => {
              if (err) throw err;

              if(isMatch){
                return done(null, user);
              } else {
                return done(null, false, { message : "Mot de passe incorrecte"})
              }
            })
        })
        .catch(err => console.log(err));
      })
  );

  passport.serializeUser( (user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser( (id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    })
  })



}