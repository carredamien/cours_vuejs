// recupération des plugins et des fichiers
const express = require('express')
const path = require('path');
const helmet = require("helmet");

const db = require('./db/db')
const { User }  = require('./db/db');
//récupération des fichiers routes
const postRoutes = require('./routes/post');
const commentRoutes = require('./routes/comment')
const userRoutes = require('./routes/user');


//appel d'express
const app = express()
app.use(helmet());

//démarrage du module connect de l'export db.js qui permet la connexion à la bdd
db.connect();  


//mise en place des en-têtes CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

//convertir les données reçues
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

//liste des routes
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);
app.use('/api/auth', userRoutes);

//6-export du fichier app
module.exports = app;