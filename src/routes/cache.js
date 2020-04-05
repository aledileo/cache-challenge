const router = require('express').Router();
const entryController = require('../controllers/entryController');

router.get('/', entryController.getAllEntries);
router.get('/:id', entryController.getEntryById);
router.put('/:id', entryController.updateEntryById);
router.delete('/:id', entryController.deleteEntryByKey);
module.exports = router;