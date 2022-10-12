/**
 * GET /quan-ly-thue-phong/danh-sach-chua-duyet
 */

const aws = require('aws-sdk');

const dynamo = new aws.DynamoDB.DocumentClient();

exports.handler = async () => {
  const dsDonDangKyTmp = await dynamo
    .scan({ TableName: 'dormitory-admin-don-dang-ky' })
    .promise();

  const dsSinhVien = await dynamo
    .scan({ TableName: 'dormitory-admin-sinh-vien' })
    .promise();

  const dsDonDangKyFilter = dsDonDangKyTmp.Items.filter(
    (donDKItem) => donDKItem.trangThai === 0,
  ).sort((a, b) => new Date(a.ngayLap).getTime() > new Date(b.ngayLap).getTime() ? 0 : -1);

  const dsDonDKRes = dsDonDangKyFilter.map((donDKItem) => {
    const sinhVienRes = dsSinhVien.Items.find(
      (sinhVienItem) => sinhVienItem.mssv === donDKItem.mssv,
    );

    return {
      ...donDKItem,
      cccd: sinhVienRes.cccd,
      mssv: sinhVienRes.mssv,
      hoTen: sinhVienRes.hoTen,
      email: sinhVienRes.email,
      ngaySinh: sinhVienRes.ngaySinh,
      gioiTinh: sinhVienRes.gioiTinh,
      soDienThoai: sinhVienRes.soDienThoai,
      hinhDaiDien: sinhVienRes.hinhDaiDien,
      queQuan: sinhVienRes.queQuan,
      danToc: sinhVienRes.danToc,
      tonGiao: sinhVienRes.tonGiao,
      lop: sinhVienRes.lop,
      nganh: sinhVienRes.nganh,
      khoa: sinhVienRes.khoa,
      khoaNganh: sinhVienRes.khoaNganh,
      nienKhoa: sinhVienRes.nienKhoa,
    };
  });

  const response = {
    statusCode: 200,
    body: JSON.stringify({ Items: dsDonDKRes }),
  };

  return response;
};
