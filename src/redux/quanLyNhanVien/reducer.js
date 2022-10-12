// eslint-disable-next-line import/no-extraneous-dependencies
import { handleActions } from 'redux-actions';
import * as Actions from './actions';

const initialState = {
  isThemNhanVienRequest: false,
  isThemNhanVienSuccess: false,
  isThemNhanVienFailure: false,
  isXacNhanDangKyTaiKhoanNhanVienRequest: false,
  isXacNhanDangKyTaiKhoanNhanVienSuccess: false,
  isXacNhanDangKyTaiKhoanNhanVienFailure: false,
  isGetDanhSachChucVuTrongRequest: false,
  isGetDanhSachChucVuTrongSuccess: false,
  isGetDanhSachChucVuTrongFailure: false,
  danhSachChucVuTrong: {},
  isGetDanhSachNhanVienRequest: false,
  isGetDanhSachNhanVienSuccess: false,
  isGetDanhSachNhanVienFailure: false,
  danhSachNhanVien: {},
  errorMessages: [],
};
const reducer = handleActions(
  {
    // #region : Thêm nhân viên
    [Actions.themNhanVienRequest]: (state) => ({
      ...state,
      isThemNhanVienRequest: true,
      isThemNhanVienSuccess: false,
      isThemNhanVienFailure: false,
    }),
    [Actions.themNhanVienSuccess]: (state) => ({
      ...state,
      isThemNhanVienRequest: false,
      isThemNhanVienSuccess: true,
      isThemNhanVienFailure: false,
      errorMessages: [],
    }),
    [Actions.themNhanVienFailure]: (state, { payload }) => ({
      ...state,
      isThemNhanVienRequest: false,
      isThemNhanVienSuccess: false,
      isThemNhanVienFailure: true,
      errorMessages: payload,
    }),
    [Actions.xacNhanDangKyTaiKhoanNhanVienRequest]: (state) => ({
      ...state,
      isXacNhanDangKyTaiKhoanNhanVienRequest: true,
      isXacNhanDangKyTaiKhoanNhanVienSuccess: false,
      isXacNhanDangKyTaiKhoanNhanVienFailure: false,
    }),
    [Actions.xacNhanDangKyTaiKhoanNhanVienSuccess]: (state) => ({
      ...state,
      isXacNhanDangKyTaiKhoanNhanVienRequest: false,
      isXacNhanDangKyTaiKhoanNhanVienSuccess: true,
      isXacNhanDangKyTaiKhoanNhanVienFailure: false,
      errorMessages: [],
    }),
    [Actions.xacNhanDangKyTaiKhoanNhanVienFailure]: (state, { payload }) => ({
      ...state,
      isXacNhanDangKyTaiKhoanNhanVienRequest: false,
      isXacNhanDangKyTaiKhoanNhanVienSuccess: false,
      isXacNhanDangKyTaiKhoanNhanVienFailure: true,
      errorMessages: payload,
    }),
    // #endregion
    // #region : Danh sách chức vụ trống
    [Actions.getDanhSachChucVuTrongRequest]: (state) => ({
      ...state,
      isGetDanhSachChucVuTrongRequest: true,
      isGetDanhSachChucVuTrongSuccess: false,
      isGetDanhSachChucVuTrongFailure: false,
    }),
    [Actions.getDanhSachChucVuTrongSuccess]: (state, { payload }) => ({
      ...state,
      isGetDanhSachChucVuTrongRequest: false,
      isGetDanhSachChucVuTrongSuccess: true,
      isGetDanhSachChucVuTrongFailure: false,
      danhSachChucVuTrong: payload,
    }),
    [Actions.getDanhSachChucVuTrongFailure]: (state, { payload }) => ({
      ...state,
      isGetDanhSachChucVuTrongRequest: false,
      isGetDanhSachChucVuTrongSuccess: false,
      isGetDanhSachChucVuTrongFailure: true,
      errorMessages: payload,
    }),
    // #endregion
    // #region : Danh sách nhân viên
    [Actions.getDanhSachNhanVienRequest]: (state) => ({
      ...state,
      isGetDanhSachNhanVienRequest: true,
      isGetDanhSachNhanVienSuccess: false,
      isGetDanhSachNhanVienFailure: false,
    }),
    [Actions.getDanhSachNhanVienSuccess]: (state, { payload }) => ({
      ...state,
      isGetDanhSachNhanVienRequest: false,
      isGetDanhSachNhanVienSuccess: true,
      isGetDanhSachNhanVienFailure: false,
      danhSachNhanVien: payload,
    }),
    [Actions.getDanhSachNhanVienFailure]: (state, { payload }) => ({
      ...state,
      isGetDanhSachNhanVienRequest: false,
      isGetDanhSachNhanVienSuccess: false,
      isGetDanhSachNhanVienFailure: true,
      errorMessages: payload,
    }),
    // #endregion
    // #region : Local
    [Actions.resetThemNhanVienState]: (state, { payload }) => ({
      ...state,
      isThemNhanVienRequest: false,
      isThemNhanVienSuccess: false,
      isThemNhanVienFailure: false,
      isXacNhanDangKyTaiKhoanNhanVienRequest: false,
      isXacNhanDangKyTaiKhoanNhanVienSuccess: false,
      isXacNhanDangKyTaiKhoanNhanVienFailure: false,
      isGetDanhSachChucVuTrongRequest: false,
      isGetDanhSachChucVuTrongSuccess: false,
      isGetDanhSachChucVuTrongFailure: false,
      danhSachChucVuTrong: {},
      errorMessages: payload,
    }),
    [Actions.resetQuanLyNhanVienState]: () => initialState,
    // #endregion
  },
  initialState,
);

export default reducer;
