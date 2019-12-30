const mongoose = require('mongoose');
const { RatingSchema } = require('../models');
const pino = require('pino');

const logger = pino({
    name: 'fivestarratingservice-server',
    messageKey: 'message',
    changeLevelName: 'severity',
    useLevelLabels: true
});

const connection = {};
const MONGO_CONFIG = {
    keepAlive: true,
    connectTimeoutMS: 30000,
    socketTimeoutMS: 0,
    useNewUrlParser: true,
    useUnifiedTopology: true
};

//using mongodb connection string from replicaset
connection.db = mongoose.createConnection('mongodb://mongo-0.mongo,mongo-1.mongo,mongo-2.mongo/hipstershop', MONGO_CONFIG, (err) => {
    if (err) throw err;
    logger.info(`Mongo DB connection started on ${process.env.MONGO_URL}`);
});

connection.models = {};
connection.models.ratings = connection.db.model('ratings', RatingSchema);

module.exports = connection;