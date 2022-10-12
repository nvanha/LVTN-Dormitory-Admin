/**
 * GET /user/get-user-by-username/{username}
 */

const aws = require('aws-sdk');

const dynamo = new aws.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  const { email } = JSON.parse(event?.body);

  const params = {};
  params.TableName = 'dormitory-admin-nhan-vien';

  const userListAll = await dynamo.scan(params).promise();

  const userRes = userListAll.Items.find(
    (userItem) => userItem.email === email,
  );

  const response = {
    statusCode: 200,
    body: JSON.stringify(userRes),
  };

  return response;
};
