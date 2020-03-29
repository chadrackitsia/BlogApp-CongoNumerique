module.exports = {
    ensureAuthenticated : function(req, res, next){
        if(req.isAuthenticated()){
            return next();
        }

        req.flash('error_msg', 'Veuillez vous connectez pour avoir accès ces ressources');
        res.redirect('/users/connexion')
    }
} 