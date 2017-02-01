'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports = (event, callback) => {
  const params = {
    TableName: 'recommendations',
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
