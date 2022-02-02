//appel des plugins
const express = require('express');
const { route } = require('express/lib/router');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

//appel du contrôleur
const userCtrl = require('../controllers/user');

//appel des routes utilisateur
router.post('/signup',multer, userCtrl.signup);
router.post('/login', userCtrl.login);
router.delete('/delete/:id',auth, userCtrl.deleteUser);
router.put('/update/:id',auth, multer, userCtrl.updateUser);

//export
module.exports = router;