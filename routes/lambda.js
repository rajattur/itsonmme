const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
    res.send({
        message: 'Calling aws.lambda function'
    })
});

module.exports = router;