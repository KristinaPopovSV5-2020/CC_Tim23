import json
import boto3
import uuid


def delete(event, context):
    item_id = event['pathParameters']['id']

    dynamodb = boto3.client('dynamodb')
    table_name = "share_table"

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


