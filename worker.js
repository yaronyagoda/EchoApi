const redis = require('redis');
const client = redis.createClient();

const start = () => {
    setInterval(() => {
        let now = Date.now();
        // console.log('Worker running' + now);
        client.zrangebyscore(process.env.SCHEDULED_JOBS_QUEUE_NAME, 0, now, (err, data) => {
            if (data.length == 0) return;
            // console.log("Found data in worker " + data);
            let messages = data.map(item => JSON.parse(item)["message"]);
            client.lpush(process.env.MESSAGES_LIST_NAME, messages, (err, data) => {
                client.zremrangebyscore(process.env.SCHEDULED_JOBS_QUEUE_NAME, 0, now);
            });
        });
    }, process.env.INTERVAL_MILI);
};

exports.start = start;