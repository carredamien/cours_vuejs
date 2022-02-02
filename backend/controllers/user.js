//appel des plugins
const bcrypt = require('bcrypt'); // appel de bcrypt pour hasher le mot de passe
const jwt = require('jsonwebtoken');// appel de jwt pour les tokens d'authentification;
require('dotenv').config(); //appel de dotenv pour la clé de salage
//appel des fichiers requis
const { User }  = require('../db/db');

//inscription utilisateur
exports.signup = (req, res, next) => {
  let user;
  const userObject = req.body;
  if (!req.file){
    user = {...userObject};
  }else
  user = {
    ...userObject,
    avatar: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  }

  // Regex
  const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+.[a-zA-Z.]{2,15}/;
  const regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/;  //au moins 4 caractères et un chiffre
  
  if(user.name == null || user.firstname == null || user.email == null || user.password == null){
   
    return res.status(400).json({'error': 'Les champs ne peuvent-être null' });
  }
  if(user.name.length >= 25 || user.name.length <= 2 ){
    return res.status(400).json({'error' : 'le nom doit avoir entre 2 et 25 caractères'});
  }

  if (!regexEmail.test(user.email)) {
    return res.status(400).json({ 'error': 'Email non valide' });
  }
  if (!regexPassword.test(user.password)) {
    return res.status(400).json({ 'error': 'erreur mot de passe, il faut 8 caractères et au minimum 1 lettre et 1 chiffre' });
  }
  
  
  const emailSignup = User.findOne({attributes: ['email'],where: { email: user.email }})
  .then((emailSignup)=>{
    if(emailSignup){
      return res.status(400).json({ error: 'email déjà utilisée' });
    }
    if(!emailSignup){
        bcrypt.hash(user.password, 10)
        .then(hash => {
         
          const userSignup = User.create({
            avatar: user.avatar,
            name: user.name,
            firstname: user.firstname,
            email: user.email,
            password: hash,
            isAdmin: 0
          })
        })
        .then(() => res.status(201).json({msg: 'Utilisateur créé'}))
        .catch(error => res.status(400).json({error})); 
    }
  })
  .catch(error => res.status(500).json({ 'error': 'adresse email déjà utilisée' }));
 
};

//connexion utilisateur
exports.login = (req, res, next) => {
  const email = req.body.email.toLowerCase();

  const userLogin = User.findOne({ where :{ email: email }}) 
  .then((userLogin) => {
    if(!userLogin){
      return res.status(401).json({ error: 'Utilisateur inconnu !' });
    }else{
      bcrypt.compare(req.body.password, userLogin.password) 
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect' });
          } 
          res.status(200).json({ 
            msg: 'vous êtes connecté à votre compte',
            author: userLogin.firstname,
            UserId: userLogin.id,
            avatar: userLogin.avatar,
            token: jwt.sign({UserId: userLogin.id, isAdmin: userLogin.isAdmin},
            process.env.TOKEN, {expiresIn: '24h'}), 
          })
        })
        .catch(error => res.status(500).json({ error }))
    }
  })
  .catch(error => res.status(500).json({ error }));
};


// Supprimer un compte //
exports.deleteUser = (req, res, next) => {
  const id = req.params.id;
  
 User.findOne({ where: { id: id }})  
    .then((user) => {
      User.destroy({ where: { id: id }}) 
        .then(() => res.status(200).json({ message: `Le compte avec l'id ${id} a été supprimé` }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch (error => res.status(500).json({ error }));
    
};
      
// Modification d'un compte //
exports.updateUser = (req, res, next) => {
  const id = req.params.id;
  let user;
  const userObject = req.body;

  if (!req.file) {
    user = { ...userObject };
  } else {
    user = {
      ...userObject,
      avatar: `${req.protocol}://${req.get("host")}/images/${
        req.file.filename
      }`,
    };
  }
  bcrypt
    .hash(user.password, 10)
    .then((hash) => {
      User.update(
        {
          avatar: user.avatar,
          name: user.name,
          firstname: user.firstname,
          email: user.email,
          password: hash,
          isAdmin: 0,
        },
        { where: { id: id } }
      );
    })
    
    .then(() => res.status(200).json({
      message: 'compte utilisateur modifié'
    }))
    .catch((error) => {
      res.status(403).json({ error });
    });
};


