//appel des fichiers requis
const { Comment }  = require('../db/db')

//Méthodes pour les routes

//méthode pour créer un commentaire
exports.createComment = (req, res, next) => {
  let comment;
  const commentObject = req.body;
  
  if (!req.file){
    comment = {...commentObject};
  }else
    comment = {
      ...commentObject,
      avatar: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  }
  Comment.create(comment)
  .then(comment => {const msg = 'le commentaire a bien été créé.'
    res.status(201).json({msg, data: comment })
  })
  .catch(error => res.status(403).json({error}));
};

//méthode pour modifier un commentaire
exports.updateComment = (req, res , next) => {
  const id = req.params.id
  Comment.update(req.body, {where: { id: id }})
  .then(_ => {
    Comment.findByPk(id)
    .then(comment => {
      const msg = `Le commentaire a bien été modifié.`
      res.status(200).json({msg, post: comment })
    })
  })
  .catch(error => res.status(403).json({error}));
};

//méthode de suppression de commentaire
exports.deleteComment = (req, res ,next) => {
  Comment.findByPk(req.params.id)
  .then(comment => {
    if(res.locals.token.isAdmin === true || comment.UserId=== res.locals.token.UserId){
      const commentDeleted = comment;
      Comment.destroy({
        where: { id: comment.id }
      })
      .then(_ => {
        const msg = 'Le commentaire supprimé.'
        res.status(200).json({msg, post: commentDeleted })
      })
      .catch(error => res.status(403).json({error}));
  
    }else{
      error => res.status(403).json({error});
    }
  }) 
  .catch(error => res.status(403).json({error}));
};

//méthode pour afficher les commentaires
exports.getAllComments = (req, res, next) => {  
  Comment.findAll()
  .then(comments => {
      const msg = 'Voici les commentaires'
      res.status(200).json({msg,comments})
  })
  .catch(error => res.status(404).json({msg: 'Impossible d\'afficher les commentaires, il y a eu une erreur' ,error}));
};

//méthode pour afficher 1 commentaire selon son id 
exports.getOneComment = (req, res, next) =>{ 
  Comment.findByPk(req.params.id)
   .then((comment) => res.status(200).json(comment))
   .catch(error => res.status(403).json({error}))
};