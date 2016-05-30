'use strict';

var express = require('express');

var controller = require('./cat.controller');
var router = express.Router();


router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.delete('/:id', controller.destroy);
router.put('/:id', controller.update);


module.exports = router;
