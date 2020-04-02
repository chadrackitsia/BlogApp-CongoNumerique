const mongoose = require("mongoose"); // Require MONGOOSE

// Configuration BLOG Schema
const blogSchema = new mongoose.Schema({
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

  module.exports = Blog; // Export du module BLOG Schema