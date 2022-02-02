//import des dépendances
const { Sequelize, DataTypes } = require('sequelize'); 
const PostModel = require('../models/Post');
const CommentModel = require('../models/Comment');
const UserModel = require('../models/User');

require('dotenv').config();

//Connexion à la database  
const sequelize = new Sequelize( process.env.DB_NAME,process.env.DB_USER, process.env.DB_PASSWORD, {
  host:process.env.HOST,
  dialect: 'mariadb',
  dialectOptions: {
    timezone: 'Etc/GMT-2'
  },
  logging: false
})

sequelize.authenticate()
.then(() => console.log('connexion établie à la bdd '))
.catch(error => console.error(`Impossible de se connecter à la bdd: ${error}`))

const Post = PostModel(sequelize, DataTypes)
const Comment = CommentModel(sequelize, DataTypes)
const User = UserModel(sequelize, DataTypes)

sequelize.models.User.hasMany(Post, { onDelete: 'cascade' });
sequelize.models.User.hasMany(Comment, { onDelete: 'cascade' });
sequelize.models.Post.hasMany(Comment, { onDelete: 'cascade' });
sequelize.models.Post.belongsTo(User);
sequelize.models.Comment.belongsTo(User);
sequelize.models.Comment.belongsTo(Post);

const connect = ()=> {  
  return sequelize.sync({force:false})
    .then(()=> console.log('la bdd est synchronisée.'))
    .catch(error => res.status(503).json({error}));
}

module.exports = { connect, Post, Comment, User };

