/**
 * POST /quan-ly-sinh-vien/them-sinh-vien
 */

const aws = require('aws-sdk');

const dynamo = new aws.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  const body = JSON.parse(event.body);

  /*
    table: {
      "ID": "",
      "cccd": "",
      "danToc": "",
      "email": "",
      "gioiTinh": 0,
      "hinhDaiDien": "",
      "hoTen": "",
      "khoa": "",
      "lop": "",
      "mssv": "",
      "nganh": "",
      "ngaySinh": "",
      "nienKhoa": "",
      "queQuan": "",
      "soDienThoai": "",
      "tonGiao": "",
      "taiKhoan": "",
      "matKhau": ""
    }
   */

  const sinhVienMoi = {
    ...body,
    ID: Math.floor(Math.random() * 1000000000).toString(),
    taiKhoan: body.mssv,
    matKhau: body.mssv,
    createdAt: new Date().toISOString(),
  };

  await dynamo
    .put({
      TableName: 'dormitory-admin-sinh-vien',
      Item: sinhVienMoi,
    })
    .promise();

  const response = {
    statusCode: 201,
    body: JSON.stringify('Thêm sinh viên thành công.'),
  };

  return response;
};
