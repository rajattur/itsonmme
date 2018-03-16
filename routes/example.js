const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
    res.send({
        message: 'example-route-demo'
    })
});

module.exports = router;