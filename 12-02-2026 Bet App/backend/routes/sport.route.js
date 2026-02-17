const { Router } = require('express');
const router = Router();

const sportController = require('../src/controllers/sport.controller');

// router.use(isAdmin);

router.post('/create', sportController.create);
router.get('/', sportController.findMany);
router.get('/find', sportController.find);
router.put('/update/:id', sportController.update);
router.delete('/delete/:id', sportController.remove);

module.exports = router;