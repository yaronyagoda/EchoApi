const uuid = require('uuid');
const redis = require('redis');
const client = redis.createClient();

const store = (message, timestamp) => {
    const data = JSON.stringify({"uuid": uuid.v1(), "message": message, "timestamp": timestamp});
    client.zadd(process.env.SCHEDULED_JOBS_QUEUE_NAME, timestamp, data);
};

exports.store = store;