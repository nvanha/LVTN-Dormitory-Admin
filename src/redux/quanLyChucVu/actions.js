// eslint-disable-next-line import/no-extraneous-dependencies
import { createAction } from 'redux-actions';

export const danhSachChucVuRequest = createAction('DANH_SACH_CHUC_VU_REQUEST');
export const danhSachChucVuSuccess = createAction('DANH_SACH_CHUC_VU_SUCCESS');
export const danhSachChucVuFailure = createAction('DANH_SACH_CHUC_VU_FAILURE');

export const resetQuanLyChucVuState = createAction('RESET_QUAN_LY_CHUC_VU_STATE');
