const express = require('express');

const router = express.Router();

// Page d'inscription
router.get('/blogs/inscription', (req, res)=> {
    res.send('Veuillez remplir le formulaire');
});

// Connection
router.get('/blogs/connection', (req, res)=> {
    res.send('Connection reussie');
});