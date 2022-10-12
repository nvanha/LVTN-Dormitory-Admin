/**
 * GET /quan-ly-sinh-vien/danh-sach-sinh-vien
 */

const aws = require('aws-sdk');

const dynamo = new aws.DynamoDB.DocumentClient();

exports.handler = async () => {
  const dsSinhVien = await dynamo
    .scan({ TableName: 'dormitory-admin-sinh-vien' })
    .promise();

  const dsHopDong = await dynamo
    .scan({ TableName: 'dormitory-admin-hop-dong' })
    .promise();

  const dsPhong = await dynamo
    .scan({ TableName: 'dormitory-admin-phong' })
    .promise();

  const dsSinhVienRes = dsHopDong.Items.map((hopDongItem) => {
    const sinhVienTheoHopDong = dsSinhVien.Items.find(
      (sinhVienItem) => sinhVienItem.mssv === hopDongItem.mssv,
    );
    const phongTheoHopDong = dsPhong.Items.find(
      (phongItem) => phongItem.maPhong === hopDongItem.maPhong,
    );

    return {
      ...sinhVienTheoHopDong,
      maPhong: phongTheoHopDong.maPhong,
      khuNha: phongTheoHopDong.khuNha,
      ngayBatDau: hopDongItem.ngayBatDau,
      ngayKetThuc: hopDongItem.ngayKetThuc,
      kyHan:
        new Date(hopDongItem.ngayKetThuc).getMonth()
        - new Date(hopDongItem.ngayBatDau).getMonth()
        + 12
          * (new Date(hopDongItem.ngayKetThuc).getFullYear()
            - new Date(hopDongItem.ngayBatDau).getFullYear()),
    };
  });

  const dsPhongUpdated = [
    ...dsSinhVienRes
      .filter((item) => item.khuNha === 'A')
      .sort((a, b) => (a.maPhong > b.maPhong ? 0 : -1)),
    ...dsSinhVienRes
      .filter((item) => item.khuNha === 'B')
      .sort((a, b) => (a.maPhong > b.maPhong ? 0 : -1)),
  ];

  const response = {
    statusCode: 200,
    body: JSON.stringify({ Items: dsPhongUpdated }),
  };

  return response;
};
