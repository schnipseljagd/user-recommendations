const AWS = require('aws-sdk');
const lambda = new AWS.Lambda();

var recommendations_create_function = process.env.RECOMMENDATIONS_CREATE_FUNCTION;

module.exports = (event, callback) => {
  event.Records.forEach(record => {
    newImage = record.dynamodb.NewImage;
    payload = {
      'userId': newImage.createdBy.S,
      'placeId': newImage.id.S,
    };

    var params = {
      FunctionName: recommendations_create_function,
      Payload: JSON.stringify({'body': JSON.stringify(payload)})
    };

    return lambda.invoke(params, (error, data) => {
      if (error) {
        console.log(error);
        return callback(error);
      }
      callback(error, data);
    });
  });
};
