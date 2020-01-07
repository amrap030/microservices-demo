const Joi = require('@hapi/joi');
const db = require('./db');
const computeRatings = require('../controllers/calculation');
const pino = require('pino');

const logger = pino({
    name: 'fivestarratingservice-server',
    messageKey: 'message',
    changeLevelName: 'severity',
    useLevelLabels: true
});

const Ratings = db.models.ratings;

async function getRating(call, callback) {
    try {
        logger.info(`getRating() invoked with request ${JSON.stringify(call.request)}`);
        const data = await Ratings.find(call.request);
        value = computeRatings(data);
        callback(null, value);
    } catch (err) {
        logger.error(`getRating() failed: ${err}`);
        callback(err);
    };
};

async function getRatings(call, callback) {
    try {
        logger.info(`getRatings() invoked with request ${JSON.stringify(call.request)}`);
        const data = await Ratings.find(call.request);
        console.log(data);
        callback(null, { "ratings": Array.from(data) });
    } catch (err) {
        logger.error(`getRatings() failed: ${err}`);
        callback(err);
    };
};

async function addRating(call, callback) {
    const { productID, rating, name, comment } = call.request;
    try {
        const schema = Joi.object({
            productID: Joi.string()
                .min(10)
                .max(10)
                .required(),
            rating: Joi.number()
                .integer()
                .min(1)
                .max(5),
            name: Joi.string()
                .required(),
            comment: Joi.string()
                .required(),   
        });
        
        try {
            const value = await schema.validateAsync({ productID, rating, name, comment });
        }
        catch (err) { 
            logger.error(`validation failed: ${err}`);
            callback(err)
        }

        logger.info(`addRating() invoked with request ${JSON.stringify(call.request)}`);
        const data = await Ratings({ productID, rating, name, comment }).save();
        callback(null, data);
    } catch (err) {
        logger.error(`addRating() failed: ${err}`);
        callback(err);
    };
};

module.exports = {
    getRating,
    addRating,
    getRatings
};