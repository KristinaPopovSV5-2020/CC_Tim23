const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const dynamodb = new AWS.DynamoDB.DocumentClient();
const username="markic";

exports.handler = async (event, context) =>  {


try {
    const tableName = 'content_table';
    const id = 'id';

    const filenames = await getDistinctFilenames(tableName, id);
    console.log('Distinct Filenames:', filenames);

    // Continue with your logic using the filenames
    // ...

    return {
      statusCode: 200,
      body: JSON.stringify({ filenames }),
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'An error occurred' }),
    };
  }
};

async function getDistinctFilenames(tableName, id) {
  const params = {
    TableName: "content_table",
    IndexName:"username-index",
    KeyConditionExpression: 'username = :username',
    ExpressionAttributeValues: {
      ':username': username,
    },
  };

  try {
  const data = await dynamodb.query(params).promise()
  const filenames = data.Items.map(item => item.filename);
  let subfolders=[];

  for(let file of filenames){
    const lastIndex = file.lastIndexOf('/');
    if(!subfolders.includes(file.substring(0, lastIndex)+"/")){
      subfolders.push(file.substring(0, lastIndex)+"/");
    }

  }

  return subfolders;
  } catch (err) {
    return { error: err }
  }


}