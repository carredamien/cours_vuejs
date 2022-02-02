//appel des plugins
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');


//appel des fichiers
const postCtrl = require('../controllers/post');

router.post('/',auth, multer, postCtrl.createPost);
router.put('/:id',auth, multer, postCtrl.updatePost);
router.delete('/:id',auth, postCtrl.deletePost);
router.get('/', auth, postCtrl.getAllPosts);
router.get('/:id',auth, postCtrl.getOnePost);

//exports
module.exports = router;