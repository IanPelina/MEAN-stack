const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();

const stuffCtrl = require('../controllers/stuff');

// Définition d'une route POST pour '/api/stuff'
// Cette route traite les demandes de création d'un nouvel objet
router.post('/', auth, stuffCtrl.createThing);
router.put('/:id', auth, stuffCtrl.modifyThing);
router.delete('/:id', auth, stuffCtrl.deleteThing);
router.get('/:id', auth, stuffCtrl.getOneThing);
router.get('/', auth, stuffCtrl.getAllThings);

module.exports = router;