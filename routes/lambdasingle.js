// const express = require('express');
// const request = require('request')

// const router = express.Router();

// router.get('/user', function (req, res, next) {
//     request.get('https://mqpzpcke86.execute-api.us-east-1.amazonaws.com/dev/compare-yourself/single',(error, response, body) => {
//         if (error) {
//             return res.send(error)
//         }
//         if (response.statusCode === 200) {
//             console.log(body)
//             res.send(JSON.parse(body))
//         }
//         else {
//             res.send({message: 'error from lambda function'})
//         }
        

//     })
// });

// module.exports = router;