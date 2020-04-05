const router = require('express').Router();
const entryController = require('../controllers/entryController');

router.get('/:id', entryController.getById);

module.exports = router;