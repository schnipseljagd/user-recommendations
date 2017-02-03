'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

var recommendations_table = process.env.RECOMMENDATIONS_TABLE;

module.exports = (event, callback) => {
  const params = {
    TableName: recommendations_table,
    KeyConditionExpression: "#userId = :userId",
    ExpressionAttributeNames: {
      "#userId": "userId"
    },
    ExpressionAttributeValues: {
      ":userId": event.pathParameters.userId
    }
  };

  return dynamoDb.query(params, (error, data) => {
    if (error) {
      return callback(error);
    }
    callback(error, data.Items);
  });
};
