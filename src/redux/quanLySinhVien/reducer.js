// eslint-disable-next-line import/no-extraneous-dependencies
import { handleActions } from 'redux-actions';

import * as Actions from './actions';

const initialState = {
  isGetDanhSachSinhVienRequest: false,
  isGetDanhSachSinhVienSuccess: false,
  isGetDanhSachSinhVienFailure: false,
  danhSachSinhVienState: {},
  errorMessages: [],
};

const reducer = handleActions(
  {
    // #region : Danh sach sinh vien
    [Actions.getDanhSachSinhVienRequest]: (state) => ({
      ...state,
      isGetDanhSachSinhVienRequest: true,
      isGetDanhSachSinhVienSuccess: false,
      isGetDanhSachSinhVienFailure: false,
    }),
    [Actions.getDanhSachSinhVienSuccess]: (state, { payload }) => ({
      ...state,
      isGetDanhSachSinhVienRequest: false,
      isGetDanhSachSinhVienSuccess: true,
      isGetDanhSachSinhVienFailure: false,
      danhSachSinhVienState: payload,
    }),
    [Actions.getDanhSachSinhVienFailure]: (state, { payload }) => ({
      ...state,
      isGetDanhSachSinhVienRequest: false,
      isGetDanhSachSinhVienSuccess: false,
      isGetDanhSachSinhVienFailure: true,
      errorMessages: payload,
    }),
    // #endregion
    // #region : Local
    [Actions.resetSinhVienState]: () => initialState,
    // #endregion
  },
  initialState,
);

export default reducer;
