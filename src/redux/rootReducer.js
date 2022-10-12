import { combineReducers } from 'redux';

import auth from './auth/reducer';
import quanLyPhong from './quanLyPhong/reducer';
import quanLyThuePhong from './quanLyThuePhong/reducer';
import quanLySinhVien from './quanLySinhVien/reducer';
import quanLyNhanVien from './quanLyNhanVien/reducer';
import quanLyTaiKhoan from './quanLyTaiKhoan/reducer';
import quanLyChucVu from './quanLyChucVu/reducer';

const rootReducer = combineReducers({
  auth,
  quanLyPhong,
  quanLyThuePhong,
  quanLySinhVien,
  quanLyNhanVien,
  quanLyChucVu,
  quanLyTaiKhoan,
});

export default rootReducer;
