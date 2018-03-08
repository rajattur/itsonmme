var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.send({
        message: 'example route'
    })
});

module.exports = router;