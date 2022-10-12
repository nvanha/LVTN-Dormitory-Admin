/* eslint-disable import/no-extraneous-dependencies */
import { call, put, takeLatest } from 'redux-saga/effects';

import { axiosMicroApiInstance } from '~/services';
import * as Actions from './actions';

function* getDanhSachSinhVien() {
  try {
    const response = yield call(() => axiosMicroApiInstance.get('/quan-ly-sinh-vien/danh-sach-sinh-vien'));
    if (response?.status === 200) {
      yield put(Actions.getDanhSachSinhVienSuccess(response.data));
    }
  } catch (e) {
    if (e?.response?.data) {
      const messages = e.response.data;
      yield put(Actions.getDanhSachSinhVienFailure(messages));
    }
  }
}

// eslint-disable-next-line func-names
export default function* () {
  yield takeLatest(Actions.getDanhSachSinhVienRequest, getDanhSachSinhVien);
}
