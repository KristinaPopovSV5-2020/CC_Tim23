import json
import boto3
import uuid
import os

dynamodb = boto3.client('dynamodb')
table_name = os.environ['SHARE_TABLE_NAME']

def delete(event, context):
    item_id = event['pathParameters']['id']



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

    return {
        'statusCode': 200,
        'body': json.dumps(response)
    }


