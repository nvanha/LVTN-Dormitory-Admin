/**
 * POST /quan-ly-phong/them-phong
 */

const aws = require('aws-sdk');

const dynamo = new aws.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  const body = JSON.parse(event.body);

  /*
     body: {
       maPhong: "",
       khuNha: "",
       soLuongGiuong: "",
       tinhTrangPhong: "",
       moTa: ""
     }
   */

  const phongMoi = {
    ...body,
    ID: Math.floor(Math.random() * 1000000000).toString(),
    createdAt: new Date().toISOString(),
  };

  await dynamo
    .put({
      TableName: 'dormitory-admin-phong',
      Item: phongMoi,
    })
    .promise();

  const response = {
    statusCode: 201,
    body: JSON.stringify('Tạo phòng thành công.'),
  };

  return response;
};
