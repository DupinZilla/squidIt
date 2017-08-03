var express = require('express');
var router = express.Router();
var controller = require('./controller');


router.get('/',controller.getAuthorize);

router.get('/callbackAuthentication',controller.getCallbackAuthentication);

router.get('/instatags',controller.getInstaTags)

//Colocar em outro router
router.get('/fotos',controller.getListHashTag)

//Colocar em outro router
router.get('/fotos/:id',controller.getHashTag)

//Colocar em outro router
router.delete('/fotos/:id',controller.deleteHashTag)

module.exports = router;
