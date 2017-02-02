'use strict';

const usersCreate = require('./libs/users/create.js');
const usersReadAll = require('./libs/users/read-all.js');
const placesCreate = require('./libs/places/create.js');
const placesReadAll = require('./libs/places/read-all.js');
const recommendationsCreate = require('./libs/recommendations/create.js');
const recommendationsReadByUserId = require('./libs/recommendations/read-by-user-id.js');
const createRecommendationForCreatedPlace = require('./libs/recommendations/create-recommendation-for-created-place.js');

const responseHandler = (context) => {
  return (error, result) => {
    if (error) {
      context.fail(error)
    } else {
      const response = {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin" : "*"
        },
        body: JSON.stringify(result),
      };

      context.succeed(response);
    }
  };
};

module.exports.usersCreate = (event, context, callback) => {
  usersCreate(event, responseHandler(context))
};
module.exports.usersReadAll = (event, context, callback) => {
  usersReadAll(event, responseHandler(context))
};
module.exports.placesCreate = (event, context, callback) => {
  placesCreate(event, responseHandler(context))
};
module.exports.placesReadAll = (event, context, callback) => {
  placesReadAll(event, responseHandler(context))
};
module.exports.recommendationsCreate = (event, context, callback) => {
  recommendationsCreate(event, responseHandler(context))
};
module.exports.recommendationsReadByUserId = (event, context, callback) => {
  recommendationsReadByUserId(event, responseHandler(context))
};
module.exports.createRecommendationForCreatedPlace = (event, context, callback) => {
  createRecommendationForCreatedPlace(event, (error, result) => {
    if (error) {
      context.fail(error)
    } else {
      context.succeed(result);
    }
  });
};
