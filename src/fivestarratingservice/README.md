# 5StarRatingService

The fivestarratingservice allows a User to leave a rating to a product from 1 to 5 stars. These ratings are saved and fetched from a MongoDB database configured as a replicaset. All ratings are then displayed in the frontend on the "Home" and "Product" Page.

**Future implementations:**

- possibility to leave a comment on a product
- possibility to sort products based on ratings
- possibility to sort comments based on ratings

## Structure

The folderstructure follows a MVC (Model View Controller) principle inside a folder called "app".

- **models:** contains the Schema definition of a rating
- **db:** contains all code related to accessing and connecting to the database
- **controllers:** contains all the additional helper functions to complete the logic

## Technical Details

The Server is written in Node.js

## Building docker image

From the repository root, run:

```
docker build --file src/fivestarratingservice/Dockerfile .
```
