const mongoose = require('mongoose');

const { Schema } = mongoose;

const RatingSchema = new Schema(
    {
        //_id: { type: mongoose.Schema.Types.ObjectId, required: false },
        productID: { type: String, required: true },
        rating: { type: Number, required: true }
    }, {
        versionKey: false
    }
);

module.exports = RatingSchema;