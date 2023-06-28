
const AWS = require('aws-sdk');
const s3 = new AWS.S3();


const table_name = process.env.CONTENT_TABLE_NAME;
const bucketName = process.env.RESOURCES_BUCKET_NAME;

const dynamodb = new AWS.DynamoDB.DocumentClient();


exports.handlerDynamoDB = async (event, context) =>  {

    try{


    const formData = event;
    const username="markic";
    //const username=event.requestContext.authorizer.claims['cognito:username'];
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


     return { filename: Item.filename,body: event }
   }catch(error){
       return { statusCode: 404, error: error.message}
   }
    }
    catch(error){
        return {error:event.id}
    }
};

exports.handlerCopy = async (event, context) => {


    const formData = event.body;
    const data=event.filename.split('/')

    try {
      await s3.headObject({ Bucket: bucketName, Key: formData.album+data[data.length-1]}).promise();
      return { statusCode: 400, error: "Name already exists."}
    } catch (e) {

    }

     const currentObjectKey = event.filename;


    const copyObjectParams = {
      Bucket: bucketName,
      CopySource: bucketName+"/"+currentObjectKey,
      Key: formData.album+data[data.length-1]
    };
    const response1=await s3.copyObject(copyObjectParams).promise();

    return { filename: event.filename,body: event.body }
}

exports.handlerDelete = async (event, context) =>  {

    const formData = event.body;
    const currentObjectKey = event.filename;

     const deleteObjectParams = {
      Bucket: bucketName,
      Key: currentObjectKey
    };
    const response2=await s3.deleteObject(deleteObjectParams).promise();

}

exports.Rollback = async (event, context) =>  {

    return event.error

}

