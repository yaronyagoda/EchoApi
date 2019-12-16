const express = require('express');
const echoApi = require('./echoApi');
const worker = require("./worker");
const echoer = require("./echoer");

const app = express();

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

port = process.argv[2] || process.env.HTTP_PORT;
app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log(`server is listening on ${port}`)
});

app.use('/echoApi', echoApi);

worker.start();
echoer.echo();
