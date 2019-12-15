const express = require('express');
const storage = require('./storage');
const bodyParser = require("body-parser");
const router = express.Router();
const app = express();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post('/echo', (request, response) => {
    var time = request.body.time;
    var message = request.body.message;
    storage.store(message, time)
    response.end(`Message ${message} received`);
});

module.exports = router;
