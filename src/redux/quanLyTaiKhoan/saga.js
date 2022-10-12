/* eslint-disable import/no-extraneous-dependencies */
import { Auth } from 'aws-amplify';
import { call, put, takeLatest } from 'redux-saga/effects';
import { axiosMicroApiInstance } from '~/services';
import * as Actions from './actions';

function* capNhatThongTinTaiKhoan({ payload }) {
  try {
    const response = yield call(() => axiosMicroApiInstance.post(
      '/quan-ly-tai-khoan/cap-nhat-thong-tin-tai-khoan',
      JSON.stringify(payload),
    ));
    if (response?.status === 201) {
      yield put(Actions.capNhatThongTinTaiKhoanSuccess(response.data));
    }
  } catch (e) {
    if (e?.response?.data) {
      const { detail } = e.response.data;
      yield put(Actions.capNhatThongTinTaiKhoanFailure(detail));
    }
  }
}

function* doiMatKhau({ payload }) {
  try {
    const { password, newPassword, email } = payload;
    const user = yield call(() => Auth.currentAuthenticatedUser());
    if (user?.attributes?.email !== email) {
      try {
        yield call(() => Auth.signIn(email.toLowerCase(), '123'));
      } catch (e) {
        if (e.code !== 'UserNotFoundException') {
          const message = [
            { code: 'EmailExistException', message: 'Email is exist' },
          ];
          yield put(Actions.doiMatKhauFailure(message));
          return;
        }
        yield call(() => Auth.updateUserAttributes(user, {
          email,
        }));
      }
    }
    if (
      password !== ''
      && newPassword !== ''
      && password !== undefined
      && newPassword !== undefined
    ) {
      yield call(() => Auth.changePassword(user, password, newPassword));
    }
    yield put(Actions.doiMatKhauSuccess());
  } catch (e) {
    const message = [e];
    yield put(Actions.doiMatKhauFailure(message));
  }
}

// eslint-disable-next-line func-names
export default function* () {
  yield takeLatest(
    Actions.capNhatThongTinTaiKhoanRequest,
    capNhatThongTinTaiKhoan,
  );
  yield takeLatest(Actions.doiMatKhauRequest, doiMatKhau);
}
