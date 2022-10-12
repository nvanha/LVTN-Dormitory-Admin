/**
 * POST /quan-ly-thue-phong/duyet-don-dang-ky
 */

const aws = require('aws-sdk');

const dynamo = new aws.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  const body = JSON.parse(event.body);

  /*
     body: {
       ID: ""
     }
   */

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

  await dynamo
    .put({
      TableName: 'dormitory-admin-don-dang-ky',
      Item: {
        ...donDangKyRes,
        trangThai: 1,
      },
    })
    .promise();

  const response = {
    statusCode: 201,
    body: JSON.stringify({
      response: donDangKyRes,
      message: 'Duyệt đơn thành công.',
    }),
  };

  return response;
};
