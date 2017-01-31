'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports = (event, callback) => {
  const params = {
    TableName: 'users',
  };

  return dynamoDb.scan(params, (error, data) => {
    if (error) {
      callback(error);
    }
    var items = []
    if (data) {
      items = data.Items;
    }
    callback(error, items);
  });
};
