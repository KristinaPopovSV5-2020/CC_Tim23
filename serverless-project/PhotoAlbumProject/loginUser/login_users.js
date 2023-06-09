const AWS = require('aws-sdk');
const cognito = new AWS.CognitoIdentityServiceProvider();

exports.handler = async (event, context) => {
  const formData = JSON.parse(event.body);


const poolData = {
    UserPoolId: 'eu-north-1_eXQUKF6d5',
    ClientId: '4nelltj3ilhar854vk16rjiim9'
};


const authParams = {
    AuthFlow: 'ADMIN_NO_SRP_AUTH',
    ClientId: poolData.ClientId,
    UserPoolId: poolData.UserPoolId,
    AuthParameters: {
      USERNAME: formData.username,
      PASSWORD: formData.password,
    }
};

try{
const response = await cognito.adminInitiateAuth(authParams).promise();
 return { statusCode: 200,body: JSON.stringify({ token: response.AuthenticationResult.IdToken })}
}catch(e){
  return { statusCode: 404, error: e.message}
}



};


