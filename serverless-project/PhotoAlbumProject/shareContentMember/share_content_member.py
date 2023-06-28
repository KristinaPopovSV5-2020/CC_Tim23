import json
import boto3
import uuid
import os

cognito = boto3.client('cognito-idp', 'eu-north-1')

dynamodb = boto3.client('dynamodb')
table_name = os.environ['SHARE_TABLE_NAME']


def share(event, context):

    payload = json.loads(event['body'])

    sharedWith = payload['username']
    username = payload['invitedUsername']
    path = username + "/"

    try:
        response = cognito.admin_get_user(
            UserPoolId='eu-north-1_eXQUKF6d5',
            Username=sharedWith
        )

    except Exception as e:
        return {
            'statusCode': 404,
            'body': str(response)
        }

    query_params = {
        'TableName': table_name,
        'IndexName': 'username-index',
        'KeyConditionExpression': 'username = :username',
        'FilterExpression': 'sharedWith = :sharedWith',
        'ExpressionAttributeValues': {
            ':username': {'S': username},
            ':sharedWith': {'S': sharedWith},
        },
    }

    response = dynamodb.query(**query_params)
    items = response.get('Items', [])
    for item in items:
        filepath = item['filepath']['S']
        id_update = item['id']['S']
        if (filepath == path):
            return {
                'statusCode': 400,
                'body': "Content has already been shared with the user!"
            }
        elif (filepath in path):
            return {
                'statusCode': 400,
                'body': "Content has already been shared with the user!"
            }
        elif (path in filepath):
            update_expression = "SET filepath = :path"
            expression_attribute_values = {
                ":path": {"S": path}
            }
            response = dynamodb.update_item(
                TableName=table_name,
                Key={"id": {"S": id_update}},
                UpdateExpression=update_expression,
                ExpressionAttributeValues=expression_attribute_values
            )
            return {
                'statusCode': 200,
                'body': json.dumps(response)
            }

    try:
        response = dynamodb.put_item(
            TableName=table_name,
            Item={
                "id": {"S": str(uuid.uuid4())},
                "username": {"S": username},
                "filepath": {"S": path},
                "sharedWith": {"S": sharedWith}
            })

        return {
            'statusCode': 200,
            'body': json.dumps(response)
        }

    except Exception as e:
        return {
            'statusCode': 403,
            'body': str(e)
        }
