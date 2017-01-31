'use strict';

const usersCreate = require('./libs/users/create.js');
const usersReadAll = require('./libs/users/read-all.js');

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
