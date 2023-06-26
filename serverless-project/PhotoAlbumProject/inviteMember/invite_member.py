import boto3
import os

dynamodb = boto3.client('dynamodb')
table_name = os.environ['MEMBER_TABLE_NAME']


def invite(event, context):
    pass