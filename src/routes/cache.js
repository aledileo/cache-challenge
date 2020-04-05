const router = require('express').Router();
const entryController = require('../controllers/entryController');

router.get('/', entryController.get);
router.get('/:id', entryController.getById);

module.exports = router;