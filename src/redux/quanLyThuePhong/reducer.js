// eslint-disable-next-line import/no-extraneous-dependencies
import { handleActions } from 'redux-actions';

import * as Actions from './actions';

const initialState = {
  isGetDanhSachChuaDuocDuyetRequest: false,
  isGetDanhSachChuaDuocDuyetSuccess: false,
  isGetDanhSachChuaDuocDuyetFailure: false,
  danhSachChuaDuocDuyetState: {},
  isDuyetDonDangKyRequest: false,
  isDuyetDonDangKySuccess: false,
  isDuyetDonDangKyFailure: false,
  duyetDonDangKyState: null,
  isXoaDonDangKyRequest: false,
  isXoaDonDangKySuccess: false,
  isXoaDonDangKyFailure: false,
  xoaDonDangKyState: null,
  isGetDanhSachChuaVaoORequest: false,
  isGetDanhSachChuaVaoOSuccess: false,
  isGetDanhSachChuaVaoOFailure: false,
  danhSachChuaVaoOState: {},
  isDuyetDonVaoORequest: false,
  isDuyetDonVaoOSuccess: false,
  isDuyetDonVaoOFailure: false,
  duyetDonVaoOState: null,
  errorMessages: [],
};

const reducer = handleActions(
  {
    // #region : Danh sach chua duoc duyet
    [Actions.getDanhSachChuaDuocDuyetRequest]: (state) => ({
      ...state,
      isGetDanhSachChuaDuocDuyetRequest: true,
      isGetDanhSachChuaDuocDuyetSuccess: false,
      isGetDanhSachChuaDuocDuyetFailure: false,
    }),
    [Actions.getDanhSachChuaDuocDuyetSuccess]: (state, { payload }) => ({
      ...state,
      isGetDanhSachChuaDuocDuyetRequest: false,
      isGetDanhSachChuaDuocDuyetSuccess: true,
      isGetDanhSachChuaDuocDuyetFailure: false,
      danhSachChuaDuocDuyetState: payload,
    }),
    [Actions.getDanhSachChuaDuocDuyetFailure]: (state, { payload }) => ({
      ...state,
      isGetDanhSachChuaDuocDuyetRequest: false,
      isGetDanhSachChuaDuocDuyetSuccess: false,
      isGetDanhSachChuaDuocDuyetFailure: true,
      errorMessages: payload,
    }),
    // #endregion
    // #region : Duyet don dang ky
    [Actions.duyetDonDangKyRequest]: (state) => ({
      ...state,
      isDuyetDonDangKyRequest: true,
      isDuyetDonDangKySuccess: false,
      isDuyetDonDangKyFailure: false,
    }),
    [Actions.duyetDonDangKySuccess]: (state, { payload }) => ({
      ...state,
      isDuyetDonDangKyRequest: false,
      isDuyetDonDangKySuccess: true,
      isDuyetDonDangKyFailure: false,
      duyetDonDangKyState: payload,
    }),
    [Actions.duyetDonDangKyFailure]: (state, { payload }) => ({
      ...state,
      isDuyetDonDangKyRequest: false,
      isDuyetDonDangKySuccess: false,
      isDuyetDonDangKyFailure: true,
      errorMessages: payload,
    }),
    [Actions.resetDuyetDonDangKyState]: (state) => ({
      ...state,
      isDuyetDonDangKyRequest: false,
      isDuyetDonDangKySuccess: false,
      isDuyetDonDangKyFailure: false,
      duyetDonDangKyState: null,
      errorMessages: [],
    }),
    // #endregion
    // #region : Xoa don dang ky
    [Actions.xoaDonDangKyRequest]: (state) => ({
      ...state,
      isXoaDonDangKyRequest: true,
      isXoaDonDangKySuccess: false,
      isXoaDonDangKyFailure: false,
    }),
    [Actions.xoaDonDangKySuccess]: (state, { payload }) => ({
      ...state,
      isXoaDonDangKyRequest: false,
      isXoaDonDangKySuccess: true,
      isXoaDonDangKyFailure: false,
      xoaDonDangKyState: payload,
    }),
    [Actions.xoaDonDangKyFailure]: (state, { payload }) => ({
      ...state,
      isXoaDonDangKyRequest: false,
      isXoaDonDangKySuccess: false,
      isXoaDonDangKyFailure: true,
      errorMessages: payload,
    }),
    [Actions.resetXoaDonDangKyState]: (state) => ({
      ...state,
      isXoaDonDangKyRequest: false,
      isXoaDonDangKySuccess: false,
      isXoaDonDangKyFailure: false,
      xoaDonDangKyState: null,
      errorMessages: [],
    }),
    // #endregion
    // #region : Danh sach chua vao o
    [Actions.getDanhSachChuaVaoORequest]: (state) => ({
      ...state,
      isGetDanhSachChuaVaoORequest: true,
      isGetDanhSachChuaVaoOSuccess: false,
      isGetDanhSachChuaVaoOFailure: false,
    }),
    [Actions.getDanhSachChuaVaoOSuccess]: (state, { payload }) => ({
      ...state,
      isGetDanhSachChuaVaoORequest: false,
      isGetDanhSachChuaVaoOSuccess: true,
      isGetDanhSachChuaVaoOFailure: false,
      danhSachChuaVaoOState: payload,
    }),
    [Actions.getDanhSachChuaVaoOFailure]: (state, { payload }) => ({
      ...state,
      isGetDanhSachChuaVaoORequest: false,
      isGetDanhSachChuaVaoOSuccess: false,
      isGetDanhSachChuaVaoOFailure: true,
      errorMessages: payload,
    }),
    // #endregion
    // #region : Duyet don vao o
    [Actions.duyetDonVaoORequest]: (state) => ({
      ...state,
      isDuyetDonVaoORequest: true,
      isDuyetDonVaoOSuccess: false,
      isDuyetDonVaoOFailure: false,
    }),
    [Actions.duyetDonVaoOSuccess]: (state, { payload }) => ({
      ...state,
      isDuyetDonVaoORequest: false,
      isDuyetDonVaoOSuccess: true,
      isDuyetDonVaoOFailure: false,
      duyetDonVaoOState: payload,
    }),
    [Actions.duyetDonVaoOFailure]: (state, { payload }) => ({
      ...state,
      isDuyetDonVaoORequest: false,
      isDuyetDonVaoOSuccess: false,
      isDuyetDonVaoOFailure: true,
      errorMessages: payload,
    }),
    [Actions.resetDuyetDonVaoOState]: (state) => ({
      ...state,
      isDuyetDonVaoORequest: false,
      isDuyetDonVaoOSuccess: false,
      isDuyetDonVaoOFailure: false,
      duyetDonVaoOState: null,
      errorMessages: [],
    }),
    // #endregion
    // #region : Local
    [Actions.resetQuanLyThuePhongState]: () => initialState,
    // #endregion
  },
  initialState,
);

export default reducer;
