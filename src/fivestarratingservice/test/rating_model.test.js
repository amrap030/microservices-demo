//Test that the model and the connection works, no logic, just testing that the access to database works
const mongoose = require('mongoose');
const mongoDB = "mongodb://127.0.0.1:27017/test_database";
mongoose.connect(mongoDB);
const Rating = require('./rating_model');

describe("Rating model test", () => {
    beforeEach(async () => {
        await Rating.remove({});
    })

    afterEach(async () => {
        await Rating.remove({});
    })

    afterAll(async () => {
        await mongoose.connection.close();
    })

    test('Has a module', () => {
        expect(Rating).toBeDefined();
    }); 

    describe("Add Rating", () => {
        test('Adds a rating', async () => {
            const rating = new Rating({productID: "2ZYFJ3GM2N", rating: 3})
            const savedRating = await rating.save()
            const expected = "2ZYFJ3GM2N"
            const actual = savedRating.productID
            expect(actual).toEqual(expected);
        }); 
    })

    describe("Get Rating", () => {
        test('Gets a rating', async () => {
            const rating = new Rating({productID: "2ZYFJ3GM2N", rating: 3})
            await rating.save()
            const foundRating = await Rating.findOne({productID: "2ZYFJ3GM2N"})
            const expected = "2ZYFJ3GM2N"
            const actual = foundRating.productID
            expect(actual).toEqual(expected);
        }); 
    })
})