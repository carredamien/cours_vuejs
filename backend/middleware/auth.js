//appel plugins

const jwt = require('jsonwebtoken'); //appel de jwt pour les token
require('dotenv').config(); //appel de dotenv pour la clé de salage

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN);
    const userId = decodedToken.userId;
    res.locals.token = decodedToken;
    
    if (req.body.userId && req.body.userId !== userId ) {
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error:'Invalid request!'
    });
  }
 
};