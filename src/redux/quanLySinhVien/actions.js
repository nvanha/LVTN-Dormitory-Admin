// eslint-disable-next-line import/no-extraneous-dependencies
import { createAction } from 'redux-actions';

export const getDanhSachSinhVienRequest = createAction('GET_DANH_SACH_SINH_VIEN_REQUEST');
export const getDanhSachSinhVienSuccess = createAction('GET_DANH_SACH_SINH_VIEN_SUCCESS');
export const getDanhSachSinhVienFailure = createAction('GET_DANH_SACH_SINH_VIEN_FAILURE');

export const resetSinhVienState = createAction('RESET_SINH_VIEN_STATE');
