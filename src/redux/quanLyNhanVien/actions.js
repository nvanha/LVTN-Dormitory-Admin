// eslint-disable-next-line import/no-extraneous-dependencies
import { createAction } from 'redux-actions';

export const themNhanVienRequest = createAction('THEM_NHAN_VIEN_REQUEST');
export const themNhanVienSuccess = createAction('THEM_NHAN_VIEN_SUCCESS');
export const themNhanVienFailure = createAction('THEM_NHAN_VIEN_FAILURE');

export const xacNhanDangKyTaiKhoanNhanVienRequest = createAction(
  'XAC_NHAN_DANG_KY_TAI_KHOAN_NHAN_VIEN_REQUEST',
);
export const xacNhanDangKyTaiKhoanNhanVienSuccess = createAction(
  'XAC_NHAN_DANG_KY_TAI_KHOAN_NHAN_VIEN_SUCCESS',
);
export const xacNhanDangKyTaiKhoanNhanVienFailure = createAction(
  'XAC_NHAN_DANG_KY_TAI_KHOAN_NHAN_VIEN_FAILURE',
);

export const getDanhSachChucVuTrongRequest = createAction(
  'GET_DANH_SACH_CHUC_VU_TRONG_REQUEST',
);
export const getDanhSachChucVuTrongSuccess = createAction(
  'GET_DANH_SACH_CHUC_VU_TRONG_SUCCESS',
);
export const getDanhSachChucVuTrongFailure = createAction(
  'GET_DANH_SACH_CHUC_VU_TRONG_FAILURE',
);

export const getDanhSachNhanVienRequest = createAction(
  'GET_DANH_SACH_NHAN_VIEN_REQUEST',
);
export const getDanhSachNhanVienSuccess = createAction(
  'GET_DANH_SACH_NHAN_VIEN_SUCCESS',
);
export const getDanhSachNhanVienFailure = createAction(
  'GET_DANH_SACH_NHAN_VIEN_FAILURE',
);

export const resetThemNhanVienState = createAction('RESET_THEM_NHAN_VIEN_STATE');
export const resetQuanLyNhanVienState = createAction('RESET_QUAN_LY_NHAN_VIEN_STATE');
