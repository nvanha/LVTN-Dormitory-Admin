/* eslint-disable import/no-extraneous-dependencies */
import { Auth } from 'aws-amplify';
import { call, put, takeLatest } from 'redux-saga/effects';
import { axiosMicroApiInstance } from '~/services';
import * as Actions from './actions';

function* themNhanVien({ payload }) {
  try {
    const { username } = payload;
    yield call(() => Auth.signIn(username.toLowerCase(), '123'));
  } catch (err) {
    if (err.code !== 'UserNotFoundException') {
      const message = [
        {
          code: 'EmailExistException',
          message:
            'Email này đã tồn tại. Vui lòng thử lại với một địa chỉ email mới.',
        },
      ];
      yield put(Actions.themNhanVienFailure(message));
      return;
    }
    try {
      const response = yield call(() => Auth.signUp(payload));
      yield put(Actions.themNhanVienSuccess(response));
    } catch (e) {
      const message = [e];
      yield put(Actions.themNhanVienFailure(message));
    }
  }
}

function* xacNhanDangKyTaiKhoanNhanVien({ payload }) {
  try {
    const { username, code } = payload;
    const response = yield call(() => Auth.confirmSignUp(username, code));
    yield put(Actions.xacNhanDangKyTaiKhoanNhanVienSuccess(response));
  } catch (err) {
    const message = [err];
    yield put(Actions.xacNhanDangKyTaiKhoanNhanVienFailure(message));
  }
}

function* getDanhSachChucVuTrong() {
  try {
    const response = yield call(() => axiosMicroApiInstance.get('/quan-ly-nhan-vien/danh-sach-chuc-vu-trong'));
    if (response?.status === 200) {
      yield put(Actions.getDanhSachChucVuTrongSuccess(response.data));
    }
  } catch (e) {
    if (e?.response?.data) {
      const { detail } = e.response.data;
      yield put(Actions.getDanhSachChucVuTrongFailure(detail));
    }
  }
}

function* getDanhSachNhanVien() {
  try {
    const response = yield call(() => axiosMicroApiInstance.get('/quan-ly-nhan-vien/danh-sach-nhan-vien'));
    if (response?.status === 200) {
      yield put(Actions.getDanhSachNhanVienSuccess(response.data));
    }
  } catch (e) {
    if (e?.response?.data) {
      const { detail } = e.response.data;
      yield put(Actions.getDanhSachNhanVienFailure(detail));
    }
  }
}

// eslint-disable-next-line func-names
export default function* () {
  yield takeLatest(Actions.themNhanVienRequest, themNhanVien);
  yield takeLatest(
    Actions.xacNhanDangKyTaiKhoanNhanVienRequest,
    xacNhanDangKyTaiKhoanNhanVien,
  );
  yield takeLatest(
    Actions.getDanhSachChucVuTrongRequest,
    getDanhSachChucVuTrong,
  );
  yield takeLatest(Actions.getDanhSachNhanVienRequest, getDanhSachNhanVien);
}
