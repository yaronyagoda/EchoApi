const uuid = require('uuid');

const store = (message, timestamp) => {
    var redis = require('redis');
    var client = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOST);
    const data = JSON.stringify({"uuid": uuid.v1(), "message": message, "timestamp": timestamp});
    client.zadd(process.env.SCHEDULED_JOBS_QUEUE_NAME, timestamp, data);
};

exports.store = store;