/**
 * POST /dang-ky-ky-tuc-xa
 */

const aws = require('aws-sdk');

const dynamo = new aws.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  const body = JSON.parse(event.body);

  /*
     body: {
       "taiKhoan": "",
       "khuNha": "",
       "kyHan": "",
     }
    */

  const donDangKyRes = {
    ID: Math.floor(Math.random() * 1000000000).toString(),
    mssv: body.taiKhoan,
    khuNha: body.khuNha,
    kyHan: body.kyHan,
    ngayLap: new Date().toISOString(),
    trangThai: 0,
  };
  /*
      0: Chưa duyệt
      1: Đã duyệt
    */

  await dynamo
    .put({
      TableName: 'dormitory-admin-don-dang-ky',
      Item: donDangKyRes,
    })
    .promise();

  return {
    statusCode: 201,
    body: JSON.stringify('Đăng ký ký túc xá thành công.'),
  };
};
