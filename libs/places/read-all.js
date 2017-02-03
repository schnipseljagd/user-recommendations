'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

var places_table = process.env.PLACES_TABLE;

module.exports = (event, callback) => {
  const params = {
    TableName: places_table,
    Limit: 10
  };

  return dynamoDb.scan(params, (error, data) => {
    if (error) {
      return callback(error);
    }
    callback(error, data.Items);
  });
};
