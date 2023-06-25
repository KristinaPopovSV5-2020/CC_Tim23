

const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const dynamodb = new AWS.DynamoDB.DocumentClient();

const table_name = process.env.CONTENT_TABLE_NAME;

exports.handler = async (event, context) =>  {


try {

    const username="markic"; //ovo treba promeniti


    const filenames = await getDistinctFilenames(tableName);
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

async function getDistinctFilenames(tableName) {
  const params = {
    TableName: table_name,
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