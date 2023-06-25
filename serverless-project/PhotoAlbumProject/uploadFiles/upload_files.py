import boto3
import uuid
import json
import base64
import os
from datetime import datetime
from botocore.exceptions import ClientError

s3_client = boto3.client('s3')
from cgi import parse_multipart, parse_header
from io import BytesIO

bucket_name = os.environ['RESOURCES_BUCKET_NAME']

dynamodb = boto3.client('dynamodb')
table_name = os.environ['CONTENT_TABLE_NAME']


def upload(event, context):
    content_type = event['headers'].get('Content-Type') or event['headers'].get('content-type')

    if not content_type:
        return {
            'statusCode': 400,
            'body': json.dumps('Missing Content-Type header')
        }

    _, params = parse_header(content_type)
    boundary = params.get('boundary')

    if not boundary:
        return {
            'statusCode': 400,
            'body': json.dumps('Missing boundary parameter in Content-Type header')
        }

    try:
        base64.b64decode(event['body'])
    except Exception as e:
        return {
            'statusCode': 400,
            'body': "ale ale" + str(e)
        }

    try:
        body = parse_multipart(BytesIO(base64.b64decode(event['body'])), {'boundary': boundary.encode('utf-8')})
    except Exception as e:
        return {
            'statusCode': 400,
            'body': str(e)
        }

    username = "markic"
    if 'requestContext' in event and 'authorizer' in event['requestContext']:
        username = event['requestContext']['authorizer']['claims']['cognito:username']

    file_name = body.get('filename', [None])[0]

    if not is_filename_unique(bucket_name, file_name):
        return {
            'statusCode': 400,
            'body': 'Filename must be unique'
        }

    try:
        response = s3_client.put_object(Body=body.get('file', [None])[0], Bucket=bucket_name, Key=file_name,
                                        ContentType=str(body.get('type', [None])[0]))
    except Exception as e:
        return {
            'statusCode': 400,
            'body': "Bad request"
        }

    current_date = datetime.now()
    date_string = current_date.strftime('%d/%m/%Y')

    try:
        response = dynamodb.put_item(
            TableName=table_name,
            Item={
                "id": {"S": str(uuid.uuid4())},
                "username": {"S": username},
                "filename": {"S": file_name},
                "fileType": {"S": str(body.get('type', [None])[0])},
                "fileSize": {"S": str(body.get('size', [None])[0])},
                "dateCreated": {"S": date_string},
                "dateModified": {"S": date_string},
                "description": {"S": body.get('desc', [None])[0]},
                "tags": {"S": body.get('tags', [None])[0]}
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


def is_filename_unique(bucket_name, filename):
    try:
        s3_client.head_object(Bucket=bucket_name, Key=filename)
        return False
    except ClientError as e:
        if e.response['Error']['Code'] == '404':
            return True
