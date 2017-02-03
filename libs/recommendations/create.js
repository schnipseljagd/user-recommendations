const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

var recommendations_table = process.env.RECOMMENDATIONS_TABLE;

module.exports = (event, callback) => {
  const body = JSON.parse(event.body);
  const data = {};
  data.userId = body.userId;
  data.placeId = body.placeId;
  data.updatedAt = new Date().getTime();

  const params = {
    TableName: recommendations_table,
    Item: data
  };

  return dynamoDb.put(params, (error, data) => {
    if (error) {
      return callback(error);
    }
    callback(error, params.Item);
  });
};
