// eslint-disable-next-line import/no-extraneous-dependencies
import { createAction } from 'redux-actions';

export const getDanhSachChuaDuocDuyetRequest = createAction(
  'GET_DANH_SACH_CHUA_DUOC_DUYET_REQUEST',
);
export const getDanhSachChuaDuocDuyetSuccess = createAction(
  'GET_DANH_SACH_CHUA_DUOC_DUYET_SUCCESS',
);
export const getDanhSachChuaDuocDuyetFailure = createAction(
  'GET_DANH_SACH_CHUA_DUOC_DUYET_FAILURE',
);

export const duyetDonDangKyRequest = createAction('DUYET_DON_DANG_KY_REQUEST');
export const duyetDonDangKySuccess = createAction('DUYET_DON_DANG_KY_SUCCESS');
export const duyetDonDangKyFailure = createAction('DUYET_DON_DANG_KY_FAILURE');

export const xoaDonDangKyRequest = createAction('XOA_DON_DANG_KY_REQUEST');
export const xoaDonDangKySuccess = createAction('XOA_DON_DANG_KY_SUCCESS');
export const xoaDonDangKyFailure = createAction('XOA_DON_DANG_KY_FAILURE');

export const getDanhSachChuaVaoORequest = createAction(
  'GET_DANH_SACH_CHUA_VAO_O_REQUEST',
);
export const getDanhSachChuaVaoOSuccess = createAction(
  'GET_DANH_SACH_CHUA_VAO_O_SUCCESS',
);
export const getDanhSachChuaVaoOFailure = createAction(
  'GET_DANH_SACH_CHUA_VAO_O_FAILURE',
);

export const duyetDonVaoORequest = createAction('DUYET_DON_VAO_O_REQUEST');
export const duyetDonVaoOSuccess = createAction('DUYET_DON_VAO_O_SUCCESS');
export const duyetDonVaoOFailure = createAction('DUYET_DON_VAO_O_FAILURE');

export const resetDuyetDonVaoOState = createAction('RESET_DUYET_DON_VAO_O_STATE');
export const resetDuyetDonDangKyState = createAction('RESET_DUYET_DON_DANG_KY_STATE');
export const resetXoaDonDangKyState = createAction('RESET_XOA_DON_DANG_KY_STATE');
export const resetQuanLyThuePhongState = createAction(
  'RESET_QUAN_LY_THUE_PHONG_STATE',
);
