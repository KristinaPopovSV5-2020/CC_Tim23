
const AWS = require('aws-sdk');
const s3 = new AWS.S3();


const table_name = process.env.CONTENT_TABLE_NAME;
cont bucketName = process.env.RESOURCES_BUCKET_NAME

exports.handler = async (event, context) =>  {


    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const formData = JSON.parse(event.body);
    const username=event.requestContext.authorizer.claims['cognito:username'];
    const contentId=formData.id;

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
    const currentDate=new Date();
    const formattedDate = new Intl.DateTimeFormat('en-GB', { dateStyle: 'short' }).format(currentDate);
    const last = Item.filename.lastIndexOf('/');
    const data=Item.filename.split('/')

    try {
      await s3.headObject({ Bucket: bucketName, Key: formData.album+data[data.length-1]}).promise();
      return { statusCode: 400, error: "Name already exists."}
    } catch (e) {

    }



    const currentObjectKey = Item.filename;

    const copyObjectParams = {
      Bucket: bucketName,
      CopySource: bucketName+"/"+currentObjectKey,
      Key: formData.album+data[data.length-1]
    };
    const response1=await s3.copyObject(copyObjectParams).promise();

    const deleteObjectParams = {
      Bucket: bucketName,
      Key: currentObjectKey
    };
    const response2=await s3.deleteObject(deleteObjectParams).promise();

    const updateParams = {
      TableName: table_name,
        Key:{ id: contentId },
      UpdateExpression: 'set dateModified = :dateModified, filename=:filename',
      ExpressionAttributeValues: {
        ':filename': formData.album+data[data.length-1],
        ':dateModified': formattedDate
      },
    };

     const response = await dynamodb.update(updateParams).promise();
     return { statusCode: 200,body: JSON.stringify(response) }
   }catch(error){
       return { statusCode: 404, error: error.message}
   }
};

