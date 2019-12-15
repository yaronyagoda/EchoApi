const redis = require('redis');
const client = redis.createClient();

const echo = () =>  {
    client.blpop([process.env.MESSAGES_LIST_NAME, 0], function (error, item) {
        console.log(`Echoing message ${item[1]}`);
        echo(client);
    });
};

exports.echo = echo;