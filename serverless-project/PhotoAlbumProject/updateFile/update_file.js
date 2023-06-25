
const AWS = require('aws-sdk');
const s3 = new AWS.S3();

exports.handler = async (event, context) =>  {


    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const formData = JSON.parse(event.body);
    //const username=event.requestContext.authorizer.claims.username;
    const username="markic";
    const contentId=event.pathParameters.id;

    const getParams = {
    TableName: 'content_table',
    Key:{ id: contentId }
  };

   try {
    const { Item } = await dynamodb.get(getParams).promise();
    if (!Item) {
     return { statusCode: 404, error: "Not found"}
    }
    const currentDate=new Date();
    const formattedDate = new Intl.DateTimeFormat('en-GB', { dateStyle: 'short' }).format(currentDate);
    const bucketName="user-photo-albums"

    if(Item.filename!=formData.fileName){

    try {
      await s3.headObject({ Bucket: bucketName, Key: formData.fileName }).promise();
      return { statusCode: 400, error: JSON.stringify("Name already exists.")}
    } catch (e) {

    }

    const currentObjectKey = Item.filename;
          const copyObjectParams = {
      Bucket: bucketName,
      CopySource: bucketName+"/"+currentObjectKey,
      Key: formData.fileName
    };
    const response1=await s3.copyObject(copyObjectParams).promise();

    const deleteObjectParams = {
      Bucket: bucketName,
      Key: currentObjectKey
    };
    const response2=await s3.deleteObject(deleteObjectParams).promise();
    }


    const updateParams = {
      TableName: 'content_table',
        Key:{ id: contentId },
      UpdateExpression: 'set dateModified = :dateModified, filename=:filename, tags=:tags, description=:description',
      ExpressionAttributeValues: {
        ':filename': formData.fileName,
        ':tags': formData.tags.join(','),
        ':dateModified': formattedDate,
        ':description':formData.desc
      },
    };

     const response = await dynamodb.update(updateParams).promise();
     return { statusCode: 200,body: JSON.stringify(response) }
   }catch(error){
       return { statusCode: 404, error: error.message}
   }
};
