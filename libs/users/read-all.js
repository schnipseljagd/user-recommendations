'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

var users_table = process.env.USERS_TABLE;

module.exports = (event, callback) => {
  const params = {
    TableName: users_table,
    Limit: 10
  };

  return dynamoDb.scan(params, (error, data) => {
    if (error) {
      return callback(error);
    }
    callback(error, data.Items);
  });
};
