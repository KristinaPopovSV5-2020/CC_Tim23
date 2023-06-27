const fs = require('fs');
const html = fs.readFileSync('index.html', { encoding: 'utf8' });

const AWS = require('aws-sdk');
const cognito = new AWS.CognitoIdentityServiceProvider();
const sesClient = new AWS.SES({ region: 'eu-north-1' });

const table_name = process.env.MEMBER_TABLE_NAME;

exports.handler = async (event, context) => {
  const formData = JSON.parse(event.body);

  const username = formData.username;
  const invitedUsername = formData.invitedUsername;
  const email = formData.email;

  const userExists = await cognito
    .adminGetUser({
      UserPoolId: process.env.USER_POOL_ID,
      Username: username,
    })
    .promise()
    .catch(() => false);

  if (userExists) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'User already exists' }),
    };
  }

  const params = {
    TableName: table_name,
    IndexName: 'username-index',
    KeyConditionExpression: 'username = :username',
    ExpressionAttributeValues: {
      ':username': invitedUsername,
    },
  };

  try {
    const data = await dynamodb.query(params).promise();
    const emails = data.Items.map(item => item.email);

    for (let e of emails) {
      if (e == email) {
        const poolData = {
          UserPoolId: 'eu-north-1_eXQUKF6d5',
          ClientId: '4nelltj3ilhar854vk16rjiim9',
        };
        const poolData1 = {
          UserPoolId: 'eu-north-1_eXQUKF6d5',
          Username: username,
        };

        const userData = {
          ClientId: '4nelltj3ilhar854vk16rjiim9',
          Username: formData.username,
          Password: formData.password,
          UserAttributes: [
            {
              Name: 'given_name',
              Value: formData.name,
            },
            {
              Name: 'family_name',
              Value: formData.surname,
            },

            {
              Name: 'preferred_username',
              Value: formData.username,
            },
            {
              Name: 'email',
              Value: formData.email,
            },
            {
              Name: 'birthdate',
              Value: formData.birth,
            },
          ],
        };

        const userDataUpdate = {
          UserPoolId: 'eu-north-1_eXQUKF6d5',
          Username: formData.username,
          UserAttributes: [
            {
              Name: 'email_verified',
              Value: 'true',
            },
          ],
        };

        try {
          const response = await cognito.signUp(userData).promise();
          const response1 = await cognito
            .adminUpdateUserAttributes(userDataUpdate)
            .promise();
          const response2 = await cognito
            .adminConfirmSignUp(poolData1)
            .promise();
          return { statusCode: 200, body: JSON.stringify(formData) };
        } catch (e) {
          return { statusCode: 404, error: e.message };
        }

      }
    }
  } catch (err) {
    return {
      statusCode: 403,
      body: JSON.stringify({ error: 'Invited username does not exist' }),
    };
  }

  const link = 'http://localhost:4200/verify-member/${encodeURIComponent(username)}/${encodeURIComponent(invitedUsername)}';

        const body = `
          <html>
            <body>
              <h1>Click on the following link to verify the invited family member:</h1>
              <p>Click <a href="${link}">here</a></p>
            </body>
          </html>
        `;
         const params = {
          Destination: {
            ToAddresses: [invitedEmail]
          },
          Message: {
            Body: {
              Html: {
                Data: body
              }
            },
            Subject: {
              Data: 'Verification of family member registration'
            }
          },
          Source: email
        };

        sesClient.sendEmail(params, (err, data) => {
          if (err) {
            console.log('Error:', err);
          } else {
            console.log('Email sent:', data);
          }
        });
};
