const fs = require('fs');
const html = fs.readFileSync('index.html', { encoding:'utf8' });

const AWS = require('aws-sdk');
const cognito = new AWS.CognitoIdentityServiceProvider();



exports.handler = async (event, context) => {
    const formData = JSON.parse(event.body);

    const username = formData.username;

    const userExists = await cognito.adminGetUser({
    UserPoolId: process.env.USER_POOL_ID,
    Username: username
  }).promise().catch(() => false);

    if (userExists) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: 'User already exists' })
        };
    }


    const poolData = {
    UserPoolId: 'eu-north-1_eXQUKF6d5',
    ClientId: '4nelltj3ilhar854vk16rjiim9'
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
            Value: formData.name
        },
        {
            Name: 'family_name',
            Value: formData.surname
        },

        {
            Name: 'preferred_username',
            Value: formData.username
        },
         {
            Name: 'email',
            Value: formData.email
        },
        {
            Name: 'birthdate',
            Value: formData.birth
        }

    ]
};

const userDataUpdate = {
    UserPoolId: 'eu-north-1_eXQUKF6d5',
    Username: formData.username,
    UserAttributes: [
        {
            Name: 'email_verified',
            Value: 'true',
        }


    ]
};

    try {
        const response = await cognito.signUp(userData).promise();
        const response1 = await cognito.adminUpdateUserAttributes(userDataUpdate).promise();
        const response2 = await cognito.adminConfirmSignUp(poolData1).promise();
          return { statusCode: 200,body: JSON.stringify(formData) }
    } catch (e) {
          return { statusCode: 404, error: e.message}
    }


};
