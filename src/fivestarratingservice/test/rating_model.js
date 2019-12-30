const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RatingSchema = new Schema(
    {
        //_id: { type: mongoose.Schema.Types.ObjectId, required: false },
        productID: { type: String, required: true },
        rating: { type: Number, required: true }
    }, {
        versionKey: false
    }
);

module.exports = mongoose.model("Rating", RatingSchema);