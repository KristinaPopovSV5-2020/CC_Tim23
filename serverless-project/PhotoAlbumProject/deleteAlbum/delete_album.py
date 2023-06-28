import json
import boto3
import os

bucket_name = os.environ['RESOURCES_BUCKET_NAME']
table_name = os.environ['CONTENT_TABLE_NAME']
share_name = os.environ['SHARE_TABLE_NAME']

def delete(event, context):
    path_params = event.get('pathParameters', {})
    variable_value = path_params.get('album')
    folder_path = variable_value.replace(',', '/')
    user = folder_path.split("/")[0]
    username = "markic"
    if 'requestContext' in event and 'authorizer' in event['requestContext']:
        username = event['requestContext']['authorizer']['claims']['cognito:username']
        if username != user:
            return {
                'statusCode': '403',
                'body': "You can't delete this folder."
            }

    s3_client = boto3.client('s3')

    try:
        response = s3_client.list_objects_v2(Bucket=bucket_name, Prefix=folder_path)
        if 'Contents' in response:
            delete_objects = {'Objects': [{'Key': obj['Key']} for obj in response['Contents']]}
            s3_client.delete_objects(Bucket=bucket_name, Delete=delete_objects)

    except Exception as e:
        return {
            'statusCode': 500,
            'body': str(e)
        }

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

    for item in items:
        filename = item['filename']['S']
        if filename.startswith(folder_path):
            item_id = item['id']['S']

            try:
                response = dynamodb.delete_item(
                    TableName=table_name,
                    Key={"id": {"S": item_id}}
                )
            except Exception as e:
                return {
                    'statusCode': 404,
                    'body': "NotFoundException"
                }

    query_params = {
        'TableName': share_name,
        'IndexName': 'username-index',
        'KeyConditionExpression': 'username = :username',
        'ExpressionAttributeValues': {
            ':username': {'S': username},
        },
    }
    response = dynamodb.query(**query_params)
    items = response.get('Items', [])
    for item in items:
        filename = item['filepath']['S']
        if filename.startswith(folder_path):
            item_id = item['id']['S']

            try:
                response = dynamodb.delete_item(
                    TableName=share_name,
                    Key={"id": {"S": item_id}}
                )
            except Exception as e:
                return {
                    'statusCode': 404,
                    'body': "NotFoundException"
                }


    return {
        'statusCode': 200,
        'body': 'Success'
    }