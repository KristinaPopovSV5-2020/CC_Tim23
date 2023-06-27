import boto3
import os
import uuid
import json

dynamodb = boto3.client('dynamodb')
table_name = os.environ['MEMBER_TABLE_NAME']
ses_client = boto3.client('ses', region_name='eu-north-1')


def invite(event, context):
    path_params = event.get('pathParameters', {})
    variable_email = path_params.get('email')
    username = "markic"
    if 'requestContext' in event and 'authorizer' in event['requestContext']:
        username = event['requestContext']['authorizer']['claims']['cognito:username']

    sender = 'kikapopov123@gmail.com'
    body = """
    <html>
    <body>
    <p>Click the following link to register:</p>
    <a href="http://localhost:4200/signup-member">Registration</a>
    </body>
    </html>
    """
    try:
        response = ses_client.send_email(
            Source=sender,
            Destination={
                'ToAddresses': [variable_email]
            },
            Message={
                'Subject': {
                    'Data': 'Invitation to register a family member'
                },
                'Body': {
                    'Html': {
                        'Data': body
                    }
                }
            }
        )
        try:
            response = dynamodb.put_item(
                TableName=table_name,
                Item={
                    "id": {"S": str(uuid.uuid4())},
                    "username": {"S": username},
                    "email": {"S": variable_email}
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
    except Exception as e:
        return {
            'statusCode': 403,
            'body': str(e)
        }
