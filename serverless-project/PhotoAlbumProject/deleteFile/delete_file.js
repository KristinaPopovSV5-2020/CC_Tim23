const AWS = require('aws-sdk');
const s3 = new AWS.S3();

const table_name = process.env.CONTENT_TABLE_NAME;
const bucket_name = process.env.RESOURCES_BUCKET_NAME;

exports.handler = async (event, context) =>  {

    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const username="zorica";
    //const username=event.requestContext.authorizer.claims['cognito:username'];
    const contentId=event.pathParameters.id;

    const getParams = {
    TableName: table_name,
    Key:{ id: contentId }
  };

   try {
    const { Item } = await dynamodb.get(getParams).promise();
    if (!Item) {
     return { statusCode: 404, error: "Not found"}
    }
    if (Item.username !== username) {
      return { statusCode: 400, error: "Not allowed"}
    }

    const bucketName=bucket_name

    const currentObjectKey = Item.filename;


    const deleteObjectParams = {
      Bucket: bucketName,
      Key: currentObjectKey
    };
    await s3.deleteObject(deleteObjectParams).promise();

    const deleteParams = {
      TableName: table_name,
      Key:{ id: contentId }
    };

    const response = await dynamodb.delete(deleteParams).promise();

    const sqs = new AWS.SQS();
    const message = {
    'username': username ,
    'item': contentId
};
     const messageBody = JSON.stringify(message);
     const params = {
        QueueUrl: 'https://sqs.eu-north-1.amazonaws.com/815307418428/NotificationQueue',
        MessageBody: messageBody
    };

    await sqs.sendMessage(params).promise()
        .then(data => data.MessageId);


     return { statusCode: 200,body: JSON.stringify(response) }
   }catch(error){
       return { statusCode: 404, error: error.message}
   }
};