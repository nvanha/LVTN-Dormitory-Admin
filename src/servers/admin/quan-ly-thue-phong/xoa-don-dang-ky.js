/**
 * DELETE /quan-ly-thue-phong/xoa-don-dang-ky
 */

const aws = require('aws-sdk');

const dynamo = new aws.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  const body = event?.queryStringParameters || {};

  const dsDonDangKy = await dynamo
    .scan({ TableName: 'dormitory-admin-don-dang-ky' })
    .promise();

  const donDangKyRes = dsDonDangKy.Items.find(
    (donDKItem) => donDKItem.ID === body.ID,
  );

  await dynamo
    .delete({
      TableName: 'dormitory-admin-don-dang-ky',
      Key: {
        ID: donDangKyRes.ID,
      },
    })
    .promise();

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      response: donDangKyRes,
      message: 'Xoá đơn thành công.',
    }),
  };

  return response;
};
