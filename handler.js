'use strict';

const usersCreate = require('./libs/users/create.js');
const usersReadAll = require('./libs/users/read-all.js');

module.exports.usersCreate = (event, context, callback) => {
  usersCreate(event, (error, result) => {
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
  });
};

module.exports.usersReadAll = (event, context, callback) => {
  usersReadAll(event, (error, result) => {
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
  });
};
