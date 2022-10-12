// eslint-disable-next-line import/no-extraneous-dependencies
import { createAction } from 'redux-actions';

export const getDanhSachPhongRequest = createAction(
  'GET_DANH_SACH_PHONG_REQUEST',
);
export const getDanhSachPhongSuccess = createAction(
  'GET_DANH_SACH_PHONG_SUCCESS',
);
export const getDanhSachPhongFailure = createAction(
  'GET_DANH_SACH_PHONG_FAILURE',
);

export const getDanhSachPhongTrongRequest = createAction(
  'GET_DANH_SACH_PHONG_TRONG_REQUEST',
);
export const getDanhSachPhongTrongSuccess = createAction(
  'GET_DANH_SACH_PHONG_TRONG_SUCCESS',
);
export const getDanhSachPhongTrongFailure = createAction(
  'GET_DANH_SACH_PHONG_TRONG_FAILURE',
);

export const resetDanhSachPhongTrongState = createAction('RESET_DANH_SACH_PHONG_TRONG_STATE');
export const resetQuanLyPhongState = createAction('RESET_QUAN_LY_PHONG_STATE');
