/* eslint-disable import/no-extraneous-dependencies */
import { call, put, takeLatest } from 'redux-saga/effects';

import { axiosMicroApiInstance } from '~/services';
import * as Actions from './actions';

function* getDanhSachPhong() {
  try {
    const response = yield call(() => axiosMicroApiInstance.get('/quan-ly-phong/danh-sach-phong'));
    if (response?.status === 200) {
      yield put(Actions.getDanhSachPhongSuccess(response.data));
    }
  } catch (e) {
    if (e?.response?.data) {
      const messages = e.response.data;
      yield put(Actions.getDanhSachPhongFailure(messages));
    }
  }
}

function* getDanhSachPhongTrong({ payload }) {
  try {
    const response = yield call(() => axiosMicroApiInstance.get('/quan-ly-phong/danh-sach-phong-trong', {
      params: payload,
    }));
    if (response?.status === 200) {
      yield put(Actions.getDanhSachPhongTrongSuccess(response.data));
    }
  } catch (e) {
    if (e?.response?.data) {
      const messages = e.response.data;
      yield put(Actions.getDanhSachPhongTrongFailure(messages));
    }
  }
}

// eslint-disable-next-line func-names
export default function* () {
  yield takeLatest(Actions.getDanhSachPhongRequest, getDanhSachPhong);
  yield takeLatest(Actions.getDanhSachPhongTrongRequest, getDanhSachPhongTrong);
}
