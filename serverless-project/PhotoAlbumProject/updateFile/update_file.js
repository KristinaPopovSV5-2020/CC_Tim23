
const AWS = require('aws-sdk');
const s3 = new AWS.S3();

exports.handler = async (event, context) =>  {

    const table_name = process.env.CONTENT_TABLE_NAME;
    const bucket_name = process.env.RESOURCES_BUCKET_NAME;

    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const formData = JSON.parse(event.body);
    const username=event.requestContext.authorizer.claims.username;
    //const username="markic";
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
    const currentDate=new Date();
    const formattedDate = new Intl.DateTimeFormat('en-GB', { dateStyle: 'short' }).format(currentDate);


    if(Item.filename!=formData.fileName){

    try {
      await s3.headObject({ Bucket: bucket_name, Key: formData.fileName }).promise();
      return { statusCode: 400, error: JSON.stringify("Name already exists.")}
    } catch (e) {

    }

    const currentObjectKey = Item.filename;
          const copyObjectParams = {
      Bucket: bucket_name,
      CopySource: bucket_name+"/"+currentObjectKey,
      Key: formData.fileName
    };
    const response1=await s3.copyObject(copyObjectParams).promise();

    const deleteObjectParams = {
      Bucket: bucket_name,
      Key: currentObjectKey
    };
    const response2=await s3.deleteObject(deleteObjectParams).promise();
    }


    const updateParams = {
      TableName: table_name,
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
