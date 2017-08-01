var express = require('express');
var router = express.Router();
var controller = require('./controller');


router.get('/',controller.getAuthorize);

router.get('/callbackAuthentication',controller.getCallbackAuthentication);

router.get('/instatags',controller.getInstaTags)

module.exports = router;
