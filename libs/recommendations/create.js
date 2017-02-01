const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports = (event, callback) => {
  const body = JSON.parse(event.body);
  const data = {};
  data.userId = body.userId;
  data.placesId = body.placesId;
  data.updatedAt = new Date().getTime();

  const params = {
    TableName: 'recommendations',
    Item: data
  };

  return dynamoDb.put(params, (error, data) => {
    if (error) {
      return callback(error);
    }
    callback(error, params.Item);
  });
};
