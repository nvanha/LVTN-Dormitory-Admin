/* eslint-disable import/no-extraneous-dependencies */
import { call, put, takeLatest } from 'redux-saga/effects';
import { axiosMicroApiInstance } from '~/services';
import * as Actions from './actions';

function* danhSachChucVu() {
  try {
    const response = yield call(() => axiosMicroApiInstance.get('/quan-ly-chuc-vu/danh-sach-chuc-vu'));
    if (response?.status === 200) {
      yield put(Actions.danhSachChucVuSuccess(response.data));
    }
  } catch (e) {
    if (e?.response?.data) {
      const { detail } = e.response.data;
      yield put(Actions.danhSachChucVuFailure(detail));
    }
  }
}

// eslint-disable-next-line func-names
export default function* () {
  yield takeLatest(Actions.danhSachChucVuRequest, danhSachChucVu);
}
