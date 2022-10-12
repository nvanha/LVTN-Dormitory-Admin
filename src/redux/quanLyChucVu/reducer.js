// eslint-disable-next-line import/no-extraneous-dependencies
import { handleActions } from 'redux-actions';
import * as Actions from './actions';

const initialState = {
  isDanhSachChucVuRequest: false,
  isDanhSachChucVuSuccess: false,
  isDanhSachChucVuFailure: false,
  danhSachChucVu: {},
  errorMessages: [],
};
const reducer = handleActions(
  {
    // #region : Danh sách chức vụ
    [Actions.danhSachChucVuRequest]: (state) => ({
      ...state,
      isDanhSachChucVuRequest: true,
      isDanhSachChucVuSuccess: false,
      isDanhSachChucVuFailure: false,
    }),
    [Actions.danhSachChucVuSuccess]: (state, { payload }) => ({
      ...state,
      isDanhSachChucVuRequest: false,
      isDanhSachChucVuSuccess: true,
      isDanhSachChucVuFailure: false,
      danhSachChucVu: payload,
    }),
    [Actions.danhSachChucVuFailure]: (state, { payload }) => ({
      ...state,
      isDanhSachChucVuRequest: false,
      isDanhSachChucVuSuccess: false,
      isDanhSachChucVuFailure: true,
      errorMessages: payload,
    }),
    // #endregion
    // #region : Local
    [Actions.resetQuanLyChucVuState]: () => initialState,
    // #endregion
  },
  initialState,
);

export default reducer;
