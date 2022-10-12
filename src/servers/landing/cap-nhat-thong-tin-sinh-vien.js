/**
 * POST /cap-nhat-thong-tin-sinh-vien
 */

const aws = require('aws-sdk');

const dynamo = new aws.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  const body = JSON.parse(event.body);

  /*
     body: {
       "taiKhoan": "",

       "cccd": "",
       "danToc": "",
       "email": "",
       "gioiTinh": 0,
       "hinhDaiDien": "",
       "ngaySinh": "",
       "queQuan": "",
       "soDienThoai": "",
       "tonGiao": "",
     }
    */

  const dsSinhVien = await dynamo
    .scan({ TableName: 'dormitory-admin-sinh-vien' })
    .promise();

  const sinhVienRes = dsSinhVien.Items.find((sinhVienItem) => sinhVienItem.taiKhoan === body.taiKhoan);

  const sinhVienUpdate = {
    ...sinhVienRes,
    cccd: (body.cccd !== '' && body.cccd !== null && body.cccd !== undefined) ? body.cccd : sinhVienRes.cccd,
    danToc: (body.danToc !== '' && body.danToc !== null && body.danToc !== undefined) ? body.danToc : sinhVienRes.danToc,
    email: (body.email !== '' && body.email !== null && body.email !== undefined) ? body.email : sinhVienRes.email,
    gioiTinh: (body.gioiTinh !== '' && body.gioiTinh !== null && body.gioiTinh !== undefined) ? body.gioiTinh : sinhVienRes.gioiTinh,
    hinhDaiDien: (body.hinhDaiDien !== '' && body.hinhDaiDien !== null && body.hinhDaiDien !== undefined) ? body.hinhDaiDien : sinhVienRes.hinhDaiDien,
    ngaySinh: (body.ngaySinh !== '' && body.ngaySinh !== null && body.ngaySinh !== undefined) ? body.ngaySinh : sinhVienRes.ngaySinh,
    queQuan: (body.queQuan !== '' && body.queQuan !== null && body.queQuan !== undefined) ? body.queQuan : sinhVienRes.queQuan,
    soDienThoai: (body.soDienThoai !== '' && body.soDienThoai !== null && body.soDienThoai !== undefined) ? body.soDienThoai : sinhVienRes.soDienThoai,
    tonGiao: (body.tonGiao !== '' && body.tonGiao !== null && body.tonGiao !== undefined) ? body.tonGiao : sinhVienRes.tonGiao,
  };

  await dynamo
    .delete({
      TableName: 'dormitory-admin-sinh-vien',
      Key: {
        ID: sinhVienRes.ID,
      },
    })
    .promise();

  await dynamo
    .put({
      TableName: 'dormitory-admin-sinh-vien',
      Item: sinhVienUpdate,
    })
    .promise();

  const response = {
    statusCode: 201,
    body: JSON.stringify('Cập nhật thông tin thành công.'),
  };

  return response;
};
