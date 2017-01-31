'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports = (event, callback) => {
  const params = {
    TableName: 'users',
    Limit: 10
  };

  return dynamoDb.scan(params, (error, data) => {
    if (error) {
      return callback(error);
    }
    callback(error, data.Items);
  });
};
