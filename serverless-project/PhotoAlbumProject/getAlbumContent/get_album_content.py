import json
import os

import boto3
import base64
from datetime import datetime

bucket_name = os.environ['RESOURCES_BUCKET_NAME']
table_name = os.environ['CONTENT_TABLE_NAME']

def get(event, context):
    s3 = boto3.client('s3')

    path_params = event.get('pathParameters', {})
    variable_value = path_params.get('album')
    variable_value = variable_value.replace(',', '/')
    username = variable_value.split("/")[0]

    dynamodb = boto3.client('dynamodb')
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
    sorted_items = sorted(items, key=lambda x: datetime.strptime(x['dateModified']['S'], '%d/%m/%Y'), reverse=True)
    subfolders = set()
    results = []

    for item in sorted_items:
        filename = item['filename']['S']
        if filename.startswith(variable_value):
            x = filename.replace(variable_value, "")
            sp = x.split("/")
            i = len(sp)

            if i > 2:
                continue
            elif (i == 2):
                subfolders.add(sp[0])
            elif (i == 1):
                if filename[-1] == '/':
                    continue
                else:
                    attribute_values = {key: value.get('S') for key, value in item.items()}

                    s3_object = s3.get_object(Bucket=bucket_name, Key=filename)

                    data = s3_object['Body'].read()
                    data_base64 = base64.b64encode(data).decode('utf-8')
                    attribute_values['s3_object'] = data_base64
                    results.append(attribute_values)

    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json'
        },
        'body': json.dumps({
            'subfolders': list(subfolders),
            'objects': results
        })
    }
