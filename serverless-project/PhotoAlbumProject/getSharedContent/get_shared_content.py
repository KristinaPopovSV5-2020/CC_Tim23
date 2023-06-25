import json
import boto3
import os

cognito = boto3.client('cognito-idp', 'eu-north-1')
dynamodb = boto3.client('dynamodb')
bucket_name = os.environ['RESOURCES_BUCKET_NAME']
table_name = os.environ['SHARE_TABLE_NAME']
def get(event, context):
    username = "markic"
    if 'requestContext' in event and 'authorizer' in event['requestContext']:
        username = event['requestContext']['authorizer']['claims']['cognito:username']

    path_params = event.get('pathParameters', {})
    path = path_params.get('folder')
    path = path.replace(',', '/')

    query_params = {
        'TableName': table_name,
        'IndexName': 'username-index',
        'KeyConditionExpression': 'username = :username',
        'ExpressionAttributeValues': {
            ':username': {'S': username},
        },
    }

    response = dynamodb.query(**query_params)
    items = response.get('Items', [])
    results = []

    for item in items:
        filepath = item['filepath']['S']
        attribute_values = {key: value.get('S') for key, value in item.items()}
        if (filepath == path):
            results.append(attribute_values)
        elif (filepath in path):
            results.append(attribute_values)

    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json'
        },
        'body': json.dumps({
            'objects': results
        })
    }









