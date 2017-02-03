const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const uuid = require('uuid');

var places_table = process.env.PLACES_TABLE;

module.exports = (event, callback) => {
  const body = JSON.parse(event.body);
  const data = {};
  data.id = uuid.v1();
  data.createdBy = body.userId;
  data.title = body.title;
  data.updatedAt = new Date().getTime();

  const params = {
    TableName: places_table,
    Item: data
  };

  return dynamoDb.put(params, (error, data) => {
    if (error) {
      return callback(error);
    }
    callback(error, params.Item);
  });
};
