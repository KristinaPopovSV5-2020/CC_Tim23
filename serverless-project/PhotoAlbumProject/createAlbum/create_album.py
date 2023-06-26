import uuid
from datetime import datetime
import json
import os
import boto3
from botocore.exceptions import ClientError


# Extract environment variable

s3_client = boto3.client('s3')
dynamodb = boto3.client('dynamodb')
bucket_name = os.environ['RESOURCES_BUCKET_NAME']
table_name = os.environ['CONTENT_TABLE_NAME']


def create(event, context):
    folder_path = json.loads(event['body'])['name'] + '/'

    if not is_filename_unique(bucket_name, folder_path):
        return {
            'statusCode': 400,
            'body': 'Filename must be unique'
        }

    try:
        s3_client.put_object(Bucket=bucket_name, Key=(folder_path))
    except Exception as e:
        return {
            'statusCode': 500,
            'body': str(e)
        }

    current_date = datetime.now()
    date_string = current_date.strftime('%d/%m/%Y')

    username = ""
    if 'requestContext' in event and 'authorizer' in event['requestContext']:
        username = event['requestContext']['authorizer']['claims']['cognito:username']

    try:
        response = dynamodb.put_item(
            TableName=table_name,
            Item={
                "id": {"S": str(uuid.uuid4())},
                "username": {"S": username},
                "filename": {"S": folder_path},
                "dateCreated": {"S": date_string},
                "dateModified": {"S": date_string}
            })

        return {
            'statusCode': 200,
            'body': json.dumps(response)
        }

    except Exception as e:
        return {
            'statusCode': 500,
            'body': str(e)
        }


def is_filename_unique(bucket_name, filename):
    try:
        s3_client.head_object(Bucket=bucket_name, Key=filename)
        return False
    except ClientError as e:
        if e.response['Error']['Code'] == '404':
            return True
