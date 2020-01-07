const mongoose = require('mongoose');

const { Schema } = mongoose;

const RatingSchema = new Schema(
    {
        //_id: { type: mongoose.Schema.Types.ObjectId, required: true },
        productID: { type: String, required: true },
        rating: { type: Number, required: true },
        name: { type: String, required: true },
        comment: { type: String, required: true }
    }, {
        versionKey: false,
        timestamps: true
    }
);

module.exports = RatingSchema;