# 5StarRatingService [![CircleCI](https://circleci.com/gh/amrap030/microservices-demo/tree/master.svg?style=shield&circle-token=e3c2b7f924d261a40caaf372c51e0a87c91ae0ea)](https://circleci.com/gh/amrap030/microservices-demo/tree/master)

The fivestarratingservice allows a User to leave a rating to a product from 1 to 5 stars and a comment for a more detailled review. These ratings are saved and fetched from a MongoDB database configured as a replicaset. All ratings are then displayed in the frontend on the "Home" and "Product" Page.

**Integration:**

The fivestarratingservice integrates right after the frontend. The frontend provides the productID's that we can use to identify products and save ratings to this specific products. To save and fetch ratings, the fivestarrating service is connected to a mongoDB database configured as a replicaset.

**Future implementations:**

- possibility to sort products based on ratings
- possibility to sort comments based on ratings
- possibility to see distribution of ratings

## Structure

The folderstructure follows a MVC (Model View Controller) principle inside a folder called "app".

- **models:** contains the Schema definition of a rating
- **db:** contains all code related to accessing and connecting to the database
- **controllers:** contains all the additional helper functions to complete the logic

## Technical Details

The microservice is written in Node.js. It can communicate with other microservices using gRPC. The service provides the following functions that are specified in a proto file:

```proto
syntax = "proto3";

package hipstershop;

// -----------------5StarRatingService-----------------

service fiveStarRatingService {
    rpc addRating (Rating) returns (Empty); 
    rpc getRating (ProductID) returns (getRatingResponse); 
    rpc getRatings (ProductID) returns (getRatingsResponse);
}

message Rating {
    string productID = 1;
    int32 rating = 2;
    string name = 3;
    string comment = 4;
    string createdAt = 5;
}

message getRatingResponse {
    double value = 1;
    int32 ratings = 2;
}

message getRatingsResponse {
    repeated Rating ratings = 1; 
}

message ProductID {
    string productID = 1;
}

message Empty {}
```

The **addRating()** function expects a rating in the following format:

```json
{
    "productID": "2ZYFJ3GM2N",
    "rating": 3,
    "name": 'Max Mustermann',
    "comment": 'Das ist ein Kommentar!'
}
```

This function saves a rating to a product with the specified productID in the mongoDB database. The **addRating()** function returns an empty Object {}. 

The **getRating()** function expects a productID in the following format:

```json
{
    "productID": "2ZYFJ3GM2N"
}
```

This function fetches all ratings to the specified product from the mongoDB database and calculates the average rating and the amount of ratings. It returns the following object:

```json
{
    "value": 3.75,
    "ratings": 6
}
```

The **getRatings()** function expects a productID in the following format:

```json
{
    "productID": "2ZYFJ3GM2N"
}
```

This function fetches all ratings to the specified product from the mongoDB database. It returns the following object:

```json
{
    ratings: [
        { 
            "productID": "2ZYFJ3GM2N",
            "rating": 3,
            "name": 'Max Mustermann',
            "comment": 'Das ist ein Kommentar!'
        },
        { 
            "productID": "2ZYFJ3GM2N",
            "rating": 3,
            "name": 'Max Mustermann',
            "comment": 'Das ist ein Kommentar!'
        }]
}
```

## Installation

To install the application locally run the following command:

```bash
$ npm install
```

## Run local MongoDB container with Docker

To run a local MongoDB Docker container run the following command:

```bash
$ docker run -d -p 27017-27019:27017-27019 --name mongodb mongo 
```

To access the container run:

```bash
$ docker exec -it mongodb bash 
```

To create a database called "hipstershop" and a collection calle "ratings" run the following inside of the MongoDB container:

```bash
$ mongo
$ use hipstershop
$ db.createCollection("ratings")
```

To connect with the MongoDB database adjust the connection string inside of ./app/db/db.js to:

```bash
mongodb://localhost/hipstershop
```

## Testing/Validation

The JavaScript testing framework [Jest](https://github.com/facebook/jest) is used for both unit- and integration testing. The following command runs all test suites:

```bash
$ npm test
```

Additionally there is the possibility to generate a code coverage report using [Istanbul](https://github.com/istanbuljs) that is built into Jest. The following command runs all test suites and generated a code coverage report:

```json
npm run test:coverage
```

For validation against the Schema definition of a rating a library called [@hapi/joi](https://github.com/hapijs/joi) is used. Joi is part of the hapi ecosystem and was designed to work seamlessly with the hapi web framework and its other components.

All of these modules are saved as DevDependencies and are not part of the build, when building a Docker image.

## Building docker image

From the repository root, run:

```
docker build --file src/fivestarratingservice/Dockerfile .
```
