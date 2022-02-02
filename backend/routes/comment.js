//appel des plugins
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config');
//appel des fichiers
const postCtrl = require('../controllers/comment');

router.post('/', auth, multer, postCtrl.createComment);
router.put('/:id', auth, multer, postCtrl.updateComment);
router.delete('/:id', auth, postCtrl.deleteComment);
router.get('/',auth, postCtrl.getAllComments);
router.get('/:id', auth, postCtrl.getOneComment);

//exports
module.exports = router;