/* eslint-disable import/no-extraneous-dependencies */
import { call, put, takeLatest } from 'redux-saga/effects';

import { axiosMicroApiInstance } from '~/services';
import * as Actions from './actions';

function* getDanhSachChuaDuocDuyet() {
  try {
    const response = yield call(() => axiosMicroApiInstance.get('/quan-ly-thue-phong/danh-sach-chua-duyet'));
    if (response?.status === 200) {
      yield put(Actions.getDanhSachChuaDuocDuyetSuccess(response.data));
    }
  } catch (e) {
    if (e?.response?.data) {
      const messages = e.response.data;
      yield put(Actions.getDanhSachChuaDuocDuyetFailure(messages));
    }
  }
}

function* duyetDonDangKy({ payload }) {
  try {
    const response = yield call(() => axiosMicroApiInstance.post(
      '/quan-ly-thue-phong/duyet-don-dang-ky',
      JSON.stringify(payload),
    ));
    if (response?.status === 201) {
      yield put(Actions.duyetDonDangKySuccess(response.data));
    }
  } catch (e) {
    if (e?.response?.data) {
      const messages = e.response.data;
      yield put(Actions.duyetDonDangKyFailure(messages));
    }
  }
}

function* xoaDonDangKy({ payload }) {
  try {
    const response = yield call(() => axiosMicroApiInstance.delete('/quan-ly-thue-phong/xoa-don-dang-ky', {
      params: payload,
    }));
    if (response?.status === 200) {
      yield put(Actions.xoaDonDangKySuccess(response.data));
    }
  } catch (e) {
    if (e?.response?.data) {
      const { detail } = e.response.data;
      yield put(Actions.xoaDonDangKyFailure(detail));
    }
  }
}

function* getDanhSachChuaVaoO() {
  try {
    const response = yield call(() => axiosMicroApiInstance.get('/quan-ly-thue-phong/danh-sach-chua-vao-o'));
    if (response?.status === 200) {
      yield put(Actions.getDanhSachChuaVaoOSuccess(response.data));
    }
  } catch (e) {
    if (e?.response?.data) {
      const messages = e.response.data;
      yield put(Actions.getDanhSachChuaVaoOFailure(messages));
    }
  }
}

function* duyetDonVaoO({ payload }) {
  try {
    const response = yield call(() => axiosMicroApiInstance.post(
      '/quan-ly-thue-phong/duyet-don-vao-o',
      JSON.stringify(payload),
    ));
    if (response?.status === 201) {
      yield put(Actions.duyetDonVaoOSuccess(response.data));
    }
  } catch (e) {
    if (e?.response?.data) {
      const messages = e.response.data;
      yield put(Actions.duyetDonVaoOFailure(messages));
    }
  }
}

// eslint-disable-next-line func-names
export default function* () {
  yield takeLatest(
    Actions.getDanhSachChuaDuocDuyetRequest,
    getDanhSachChuaDuocDuyet,
  );
  yield takeLatest(Actions.duyetDonDangKyRequest, duyetDonDangKy);
  yield takeLatest(Actions.xoaDonDangKyRequest, xoaDonDangKy);
  yield takeLatest(
    Actions.getDanhSachChuaVaoORequest,
    getDanhSachChuaVaoO,
  );
  yield takeLatest(Actions.duyetDonVaoORequest, duyetDonVaoO);
}
