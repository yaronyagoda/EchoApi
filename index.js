const express = require('express');
const echoApi = require('./echoApi');
const worker = require("./worker");
const echoer = require("./echoer");

const app = express();

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

app.listen(process.env.HTTP_PORT, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log(`server is listening on ${process.env.HTTP_PORT}`)
});

app.use('/echoApi', echoApi);

worker.start();
echoer.echo();
