/**
 * GET /quan-ly-phong/danh-sach-phong
 */

const aws = require('aws-sdk');

const dynamo = new aws.DynamoDB.DocumentClient();

exports.handler = async () => {
  const params = {};
  params.TableName = 'dormitory-admin-phong';

  const dsPhongTmp = await dynamo.scan(params).promise();

  const dsHopDong = await dynamo
    .scan({ TableName: 'dormitory-admin-hop-dong' })
    .promise();

  const dsSinhVien = await dynamo
    .scan({ TableName: 'dormitory-admin-sinh-vien' })
    .promise();

  const dsPhongResTmp = dsPhongTmp.Items.map((phongItem) => {
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

  const dsPhongRes = {
    khuNhaA: dsPhongResTmp
      .filter((item) => item.khuNha === 'A')
      .sort((a, b) => (a.maPhong > b.maPhong ? 0 : -1)),
    khuNhaB: dsPhongResTmp
      .filter((item) => item.khuNha === 'B')
      .sort((a, b) => (a.maPhong > b.maPhong ? 0 : -1)),
  };

  const response = {
    statusCode: 200,
    body: JSON.stringify({ ...dsPhongTmp, Items: dsPhongRes }),
  };

  return response;
};
