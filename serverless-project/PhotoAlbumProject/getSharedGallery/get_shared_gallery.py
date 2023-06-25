import json
import boto3
import base64
from datetime import datetime
import os

dynamodb = boto3.client('dynamodb')
table_name = os.environ['SHARE_TABLE_NAME']

def get(event, context):
    username = "kika"
    if 'requestContext' in event and 'authorizer' in event['requestContext']:
        username = event['requestContext']['authorizer']['claims']['cognito:username']


    query_params = {
        'TableName': table_name,
        'IndexName': 'sharedWith-index',
        'KeyConditionExpression': 'sharedWith = :sharedWith',
        'ExpressionAttributeValues': {
            ':sharedWith': {'S': username},
        },
    }

    response = dynamodb.query(**query_params)
    items = response.get('Items', [])

    contents = []
    folders = []

    for item in items:
        attribute_values = {key: value.get('S') for key, value in item.items()}
        filename = item['filepath']['S']
        if "." in filename:
            contents.append(attribute_values)
        else:
            folders.append(attribute_values)

    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json'
        },
        'body': json.dumps({
            'subfolders': folders,
            'objects': contents
        })
    }

