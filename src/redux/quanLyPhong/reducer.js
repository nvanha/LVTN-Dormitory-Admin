// eslint-disable-next-line import/no-extraneous-dependencies
import { handleActions } from 'redux-actions';

import * as Actions from './actions';

const initialState = {
  isGetDanhSachPhongRequest: false,
  isGetDanhSachPhongSuccess: false,
  isGetDanhSachPhongFailure: false,
  danhSachPhongState: {},
  isGetDanhSachPhongTrongRequest: false,
  isGetDanhSachPhongTrongSuccess: false,
  isGetDanhSachPhongTrongFailure: false,
  danhSachPhongTrongState: {},
  errorMessages: [],
};

const reducer = handleActions(
  {
    // #region : Danh sach phong
    [Actions.getDanhSachPhongRequest]: (state) => ({
      ...state,
      isGetDanhSachPhongRequest: true,
      isGetDanhSachPhongSuccess: false,
      isGetDanhSachPhongFailure: false,
    }),
    [Actions.getDanhSachPhongSuccess]: (state, { payload }) => ({
      ...state,
      isGetDanhSachPhongRequest: false,
      isGetDanhSachPhongSuccess: true,
      isGetDanhSachPhongFailure: false,
      danhSachPhongState: payload,
    }),
    [Actions.getDanhSachPhongFailure]: (state, { payload }) => ({
      ...state,
      isGetDanhSachPhongRequest: false,
      isGetDanhSachPhongSuccess: false,
      isGetDanhSachPhongFailure: true,
      errorMessages: payload,
    }),
    // #endregion
    // #region : Danh sach phong
    [Actions.getDanhSachPhongTrongRequest]: (state) => ({
      ...state,
      isGetDanhSachPhongTrongRequest: true,
      isGetDanhSachPhongTrongSuccess: false,
      isGetDanhSachPhongTrongFailure: false,
    }),
    [Actions.getDanhSachPhongTrongSuccess]: (state, { payload }) => ({
      ...state,
      isGetDanhSachPhongTrongRequest: false,
      isGetDanhSachPhongTrongSuccess: true,
      isGetDanhSachPhongTrongFailure: false,
      danhSachPhongTrongState: payload,
    }),
    [Actions.getDanhSachPhongTrongFailure]: (state, { payload }) => ({
      ...state,
      isGetDanhSachPhongTrongRequest: false,
      isGetDanhSachPhongTrongSuccess: false,
      isGetDanhSachPhongTrongFailure: true,
      errorMessages: payload,
    }),
    [Actions.resetDanhSachPhongTrongState]: (state) => ({
      ...state,
      isGetDanhSachPhongTrongRequest: false,
      isGetDanhSachPhongTrongSuccess: false,
      isGetDanhSachPhongTrongFailure: false,
      danhSachPhongTrongState: {},
      errorMessages: [],
    }),
    // #endregion
    // #region : Local
    [Actions.resetQuanLyPhongState]: () => initialState,
    // #endregion
  },
  initialState,
);

export default reducer;
