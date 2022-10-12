// eslint-disable-next-line import/no-extraneous-dependencies
import { createAction } from 'redux-actions';

export const capNhatThongTinTaiKhoanRequest = createAction('CAP_NHAT_THONG_TIN_TAI_KHOAN_REQUEST');
export const capNhatThongTinTaiKhoanSuccess = createAction('CAP_NHAT_THONG_TIN_TAI_KHOAN_SUCCESS');
export const capNhatThongTinTaiKhoanFailure = createAction('CAP_NHAT_THONG_TIN_TAI_KHOAN_FAILURE');

export const doiMatKhauRequest = createAction('DOI_MAT_KHAU_REQUEST');
export const doiMatKhauSuccess = createAction('DOI_MAT_KHAU_SUCCESS');
export const doiMatKhauFailure = createAction('DOI_MAT_KHAU_FAILURE');

export const resetQuanLyTaiKhoanState = createAction('RESET_QUAN_LY_TAI_KHOAN_STATE');
