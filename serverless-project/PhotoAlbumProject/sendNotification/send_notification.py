import os
import boto3
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

const table = process.env.CONTENT_TABLE_NAME;

def lambda_handler(event, context):
    dynamodb = boto3.resource('dynamodb')
    user_table=dynamodb.Table('users_table')

    sqs = boto3.resource('sqs')
    queue_name = 'NotificationQueue'
    queue = sqs.get_queue_by_name(QueueName=queue_name)

    for record in event['Records']:
        item_id = record['body']['item']
        modified_item = table.get_item(Key={'item_id': item_id})['Item']

         username = record['body']['username']

        response = users_table.get_item(Key={'username': username})
        if 'Item' in response:
            user_email = response['Item']['email']

            email_subject = 'Item Modification'
            email_content = f'An item has been modified: {modified_item}'

            sendgrid_api_key = os.environ['SENDGRID_API_KEY']
            sender_email = 'kika123@gmail.com'
            message = Mail(from_email=sender_email, to_emails=user_email, subject=email_subject, plain_text_content=email_content)
            try:
                sendgrid_client = SendGridAPIClient(sendgrid_api_key)
                response = sendgrid_client.send(message)
                print(f'Successfully sent email to {user_email}')
            except Exception as e:
                print(f'Error sending email to {user_email}: {e}')
        else:
            print(f'User with username {username} not found')

    queue.delete_messages(Entries=[{'Id': record['messageId'], 'ReceiptHandle': record['receiptHandle']} for record in event['Records']])