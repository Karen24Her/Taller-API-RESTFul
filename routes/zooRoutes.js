const express = require('express');
const { getZoos, createZoo, updateZoo, deleteZoo } = require('../controllers/zooController');
const auth = require('../middlewares/auth');  
const router = express.Router();

router.get('/', auth, getZoos);  
router.post('/', auth, createZoo);  
router.put('/:id', auth, updateZoo);  
router.delete('/:id', auth, deleteZoo);  

module.exports = router;

