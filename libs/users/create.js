const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const uuid = require('uuid');

module.exports = (event, callback) => {
  const body = JSON.parse(event.body);
  const data = {};
  data.id = uuid.v1();
  data.name = body.name;
  data.updatedAt = new Date().getTime();

  const params = {
    TableName: 'users',
    Item: data
  };

  return dynamoDb.put(params, (error, data) => {
    if (error) {
      return callback(error);
    }
    callback(error, params.Item);
  });
};
