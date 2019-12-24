const db = require('./db');
const computeRatings = require('../controllers/calculation');
const pino = require('pino');

const logger = pino({
    name: 'currencyservice-server',
    messageKey: 'message',
    changeLevelName: 'severity',
    useLevelLabels: true
});

const Ratings = db.models.ratings;

async function getRating(call, callback) {
    try {
        logger.info(`getRating() invoked with request ${JSON.stringify(call.request)}`);
        const data = await Ratings.find(call.request);
        console.log(data)
        value = computeRatings(data);
        callback(null, value);
    } catch (err) {
        logger.error(`getRating() failed: ${err}`);
        callback(err);
    };
};

async function addRating(call, callback) {
    try {
        let rating = {
            productID: call.request.productID,
            rating: call.request.rating
        };
        logger.info(`addRating() invoked with request ${JSON.stringify(call.request)}`);
        const data = await Ratings(rating).save();
        console.log(data);
        callback(null, data);
    } catch (err) {
        logger.error(`addRating() failed: ${err}`);
        callback(err);
    };
};

module.exports = {
    getRating,
    addRating
};