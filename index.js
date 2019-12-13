const express = require('express');
const storage = require('./storage');
const bodyParser = require("body-parser");
const app = express()

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/echoApi/echo', (request, response) => {
    var time = request.body.time;
    var message = request.body.message;
    console.log("Need to echo = " + time + ", message is " + message);
    storage.store(message, time)
    response.end(`Message ${message} received`);
});


app.listen(process.env.HTTP_PORT, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log(`server is listening on ${process.env.HTTP_PORT}`)
})
