// eslint-disable-next-line import/no-extraneous-dependencies
import { handleActions } from 'redux-actions';
import * as Actions from './actions';

const initialState = {
  isCapNhatThongTinTaiKhoanRequest: false,
  isCapNhatThongTinTaiKhoanSuccess: false,
  isCapNhatThongTinTaiKhoanFailure: false,
  isDoiMatKhauRequest: false,
  isDoiMatKhauSuccess: false,
  isDoiMatKhauFailure: false,
  errorMessages: [],
};
const reducer = handleActions(
  {
    // #region : Cập nhật thông tin tài khoản
    [Actions.capNhatThongTinTaiKhoanRequest]: (state) => ({
      ...state,
      isCapNhatThongTinTaiKhoanRequest: true,
      isCapNhatThongTinTaiKhoanSuccess: false,
      isCapNhatThongTinTaiKhoanFailure: false,
    }),
    [Actions.capNhatThongTinTaiKhoanSuccess]: (state) => ({
      ...state,
      isCapNhatThongTinTaiKhoanRequest: false,
      isCapNhatThongTinTaiKhoanSuccess: true,
      isCapNhatThongTinTaiKhoanFailure: false,
      errorMessages: [],
    }),
    [Actions.capNhatThongTinTaiKhoanFailure]: (state, { payload }) => ({
      ...state,
      isCapNhatThongTinTaiKhoanRequest: false,
      isCapNhatThongTinTaiKhoanSuccess: false,
      isCapNhatThongTinTaiKhoanFailure: true,
      errorMessages: payload,
    }),
    // #endregion
    // #region : Cập nhật thông tin tài khoản
    [Actions.doiMatKhauRequest]: (state) => ({
      ...state,
      isDoiMatKhauRequest: true,
      isDoiMatKhauSuccess: false,
      isDoiMatKhauFailure: false,
    }),
    [Actions.doiMatKhauSuccess]: (state) => ({
      ...state,
      isDoiMatKhauRequest: false,
      isDoiMatKhauSuccess: true,
      isDoiMatKhauFailure: false,
      errorMessages: [],
    }),
    [Actions.doiMatKhauFailure]: (state, { payload }) => ({
      ...state,
      isDoiMatKhauRequest: false,
      isDoiMatKhauSuccess: false,
      isDoiMatKhauFailure: true,
      errorMessages: payload,
    }),
    // #endregion
    // #region : Local
    [Actions.resetQuanLyTaiKhoanState]: () => initialState,
    // #endregion
  },
  initialState,
);

export default reducer;
