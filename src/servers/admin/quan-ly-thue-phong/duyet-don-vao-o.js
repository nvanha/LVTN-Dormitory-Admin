/**
 * POST /quan-ly-thue-phong/duyet-don-vao-o
 */

const aws = require('aws-sdk');

const dynamo = new aws.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  const body = JSON.parse(event.body);

  /*
      body: {
        maHopDong: "",
        maPhong: "",
        mssv: "",
        ngayBatDau: "",
        ngayKetThuc: "",
        maNhanVien: "",
      }
    */

  await dynamo
    .delete({
      TableName: 'dormitory-admin-don-dang-ky',
      Key: {
        ID: body.maHopDong,
      },
    })
    .promise();

  const hopDongRes = {
    ID: Math.floor(Math.random() * 1000000000).toString(),
    maPhong: body.maPhong,
    mssv: body.mssv,
    ngayBatDau: body.ngayBatDau,
    ngayKetThuc: body.ngayKetThuc,
    maNhanVien: body.maNhanVien,
    ngayLap: new Date().toISOString(),
  };

  await dynamo
    .put({
      TableName: 'dormitory-admin-hop-dong',
      Item: hopDongRes,
    })
    .promise();

  const dsPhong = await dynamo
    .scan({ TableName: 'dormitory-admin-phong' })
    .promise();

  const phongRes = dsPhong.Items.find(
    (phongItem) => phongItem.maPhong === body.maPhong,
  );

  await dynamo
    .put({
      TableName: 'dormitory-admin-phong',
      Item: {
        ...phongRes,
        tinhTrangPhong: phongRes.tinhTrangPhong + 1,
      },
    })
    .promise();

  const response = {
    statusCode: 201,
    body: JSON.stringify({
      response: body,
      message: 'Duyệt đơn vào ở thành công.',
    }),
  };

  return response;
};
