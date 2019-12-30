/**
 * Computes the ratings per product.
 *
 * @param {*} request
 * @return { value: value, ratings: ratings } - value = mean of ratings, ratings = amount of ratings
 */
module.exports = function computeRating (request) {
    const totalRatings = request.reduce(function (temp, curr) {
        return temp + curr.rating;
    }, 0);
    const ratings = request.length
    const value = Number((Math.round((totalRatings/ratings) * 100)/100).toFixed(2)); //rounding to 2 digits after comma
    if (isNaN(value)) {
        return { value: 0, ratings: 0 };
    }
    return { value: value, ratings: ratings };
};