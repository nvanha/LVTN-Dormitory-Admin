import { all } from 'redux-saga/effects';

import auth from './auth/saga';
import quanLyPhong from './quanLyPhong/saga';
import quanLyThuePhong from './quanLyThuePhong/saga';
import quanLySinhVien from './quanLySinhVien/saga';
import quanLyNhanVien from './quanLyNhanVien/saga';
import quanLyTaiKhoan from './quanLyTaiKhoan/saga';
import quanLyChucVu from './quanLyChucVu/saga';

export default function* rootSaga() {
  yield all([
    auth(),
    quanLyThuePhong(),
    quanLyPhong(),
    quanLySinhVien(),
    quanLyNhanVien(),
    quanLyChucVu(),
    quanLyTaiKhoan(),
  ]);
}
