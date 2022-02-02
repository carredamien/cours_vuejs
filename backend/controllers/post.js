//appel des plugins
const fs = require('fs'); // plugin qui donne accès a la fonction de suppression de l'image
//appel des fichiers requis
const { Post } = require('../db/db')

//Liste des méthodes pour les routes
//méthode pour créer un post
exports.createPost = (req, res, next) => { 
  let post;
  const postObject = req.body;
  if (!req.file){
    post = {...postObject};
  }else
    post = {
      ...postObject,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  }
  Post.create(post)
  .then(post => {
    const msg = `Votre article ayant le titre: ${post.title} a bien été créé.`
    res.status(201).json({ msg, data: post })
  })
  .catch((error) => res.status(403).json({error}));
};

//méthode pour modifier un article
exports.updatePost = (req, res, next) => {
  const id = req.params.id;
  let post;
  const postObject = req.body;
  if (!req.file){
    post = {...postObject};
  }else
    post = {
      ...postObject,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  };
 
  Post.update(
    {
      imageUrl: post.imageUrl,
      title: post.title,
      content: post.content,
    },
    
    {where: { id: id }})
  .then(_ => {
    Post.findByPk(id)
    .then(post => {
      const msg = `L\'article ${post.title} a bien été modifié.`
      res.status(200).json({msg, data: post })
    })
    .catch(error => res.status(403).json({error}));
  })
  .catch(error => res.status(403).json({error}));
};

exports.deletePost = (req, res, next) => {
  Post.findByPk(req.params.id)
    .then((post) => {
      if (
        res.locals.token.isAdmin === true ||
        post.UserId === res.locals.token.UserId || post.UserId == 1
      ) {
        if (post.imageUrl) {
          const filename = post.imageUrl.split("/images/")[1];
          fs.unlink(`images/${filename}`, () => {
            const postDeleted = post;
            Post.destroy({
              where: { id: post.id },
            })
              .then((postDeleted) => {
                const msg = `L'article avec l'identifiant n°${postDeleted.id} a bien été supprimé.`;
                res.status(200).json({ msg, data: postDeleted });
              })
              .catch((error) => {
                res.status(403).json({ error });
              });
          });
        } else {
          Post.destroy({
            where: { id: post.id },
          })
            .then((postDeleted) => {
              const msg = `L'article avec l'identifiant n°${postDeleted.id} a bien été supprimé.`;
              res.status(200).json({ msg, data: postDeleted });
            })
            .catch((error) => {
              res.status(403).json({ error });
            });
        }
      } else {
        res.status(403).json({ error });
      }
    })
    .catch((error) => {
      res.status(403).json({ error });
    });
};

//méthode pour afficher les articles
exports.getAllPosts = (req, res, next) => { 
  Post.findAll({
    order: [
      ['created', 'DESC'], 
    ],
  })
  .then(posts => {
      const msg = 'Voici les articles'
      res.status(200).json({msg, posts})
  })
  .catch(error => res.status(404).json({msg: 'Impossible d\'afficher les articles, il y a eu une erreur' ,error}));
};

//méthode pour afficher 1 article selon son id 
exports.getOnePost = (req, res, next) =>{  
  Post.findByPk(req.params.id)
  .then((post) => res.status(200).json(post))
  .catch(error => res.status(403).json({error, msg: 'Il n\'y a pas d\'article'}))
};



