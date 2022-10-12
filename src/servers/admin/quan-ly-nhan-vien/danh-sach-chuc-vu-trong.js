/**
 * GET /quan-ly-nhan-vien/danh-sach-chuc-vu-trong
 */

const aws = require('aws-sdk');

const dynamo = new aws.DynamoDB.DocumentClient();

exports.handler = async () => {
  const dsChucVu = await dynamo
    .scan({ TableName: 'dormitory-admin-chuc-vu' })
    .promise();

  const dsChucVuRes = dsChucVu.Items.filter(
    (chucVuItem) => chucVuItem.tinhTrang < chucVuItem.soLuong,
  );

  const response = {
    statusCode: 200,
    body: JSON.stringify({ ...dsChucVu, Items: dsChucVuRes }),
  };

  return response;
};
