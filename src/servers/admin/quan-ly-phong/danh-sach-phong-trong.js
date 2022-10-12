/**
 * GET /quan-ly-phong/danh-sach-phong-trong
 */

const aws = require('aws-sdk');

const dynamo = new aws.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  const body = event?.queryStringParameters || {};

  const params = {};
  params.TableName = 'dormitory-admin-phong';

  const dsPhongTmp = await dynamo.scan(params).promise();

  const dsHopDong = await dynamo
    .scan({ TableName: 'dormitory-admin-hop-dong' })
    .promise();

  const dsSinhVien = await dynamo
    .scan({ TableName: 'dormitory-admin-sinh-vien' })
    .promise();

  const dsPhongFilter = dsPhongTmp.Items.filter((phongItem) => phongItem.khuNha === body.khuNha).filter((phongItem) => phongItem.tinhTrangPhong < 6);

  const dsPhongResTmp = dsPhongFilter.map((phongItem) => {
    const danhSachSinhVien = [];
    dsHopDong.Items.map((hopDongItem) => {
      if (hopDongItem.maPhong === phongItem.maPhong) {
        const sinhVienTheoPhong = dsSinhVien.Items.find(
          (sinhVienItem) => sinhVienItem.mssv === hopDongItem.mssv,
        );
        danhSachSinhVien.push({
          ...sinhVienTheoPhong,
          maPhong: phongItem.maPhong,
          khuNha: phongItem.khuNha,
          ngayBatDau: hopDongItem.ngayBatDau,
          ngayKetThuc: hopDongItem.ngayKetThuc,
          kyHan:
             new Date(hopDongItem.ngayKetThuc).getMonth()
             - new Date(hopDongItem.ngayBatDau).getMonth()
             + 12
               * (new Date(hopDongItem.ngayKetThuc).getFullYear()
                 - new Date(hopDongItem.ngayBatDau).getFullYear()),
        });
      }
    });
    const phongItemRes = {
      ...phongItem,
      danhSachSinhVien,
    };
    return phongItemRes;
  });

  const dsPhongRes = dsPhongResTmp.sort((a, b) => (a.maPhong > b.maPhong ? 0 : -1));

  const response = {
    statusCode: 200,
    body: JSON.stringify({ Items: dsPhongRes }),
  };

  return response;
};
