import { useFormik } from 'formik';
import { useEffect } from 'react';
import {
  Col, Form, Row, Spinner,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

import { ButtonCustom, InputPassword, InputText } from '~/components/form';
import { ToastSuccess } from '~/helpers/toastHelpers';
import {
  doiMatKhauRequest,
  resetQuanLyTaiKhoanState,
} from '~/redux/quanLyTaiKhoan/actions';

const DoiMatKhau = () => {
  const { userData } = useSelector((store) => store.auth);
  const {
    errorMessages,
    isDoiMatKhauFailure,
    isDoiMatKhauRequest,
    isDoiMatKhauSuccess,
  } = useSelector((store) => store.quanLyTaiKhoan);
  const dispatch = useDispatch();

  useEffect(
    () => () => {
      dispatch(resetQuanLyTaiKhoanState());
    },
    [],
  );

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      newPassword: '',
      confirmPassword: '',
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      password: Yup.string().trim().required('Vui lòng nhập mật khẩu cũ.'),
      newPassword: Yup.string()
        .trim()
        .required('Vui lòng nhập mật khẩu mới.')
        .min(8, 'Mật khẩu ít nhất 8 ký tự.')
        .max(20, 'Mật khẩu nhiều nhất 20 ký tự.')
        .matches(/[A-Z]/, 'Mật khẩu cần ký tự viết hoa.')
        .matches(/[0-9]/, 'Mật khẩu cần số.'),
      confirmPassword: Yup.string()
        .trim()
        .required('Vui lòng nhập lại mật khẩu.')
        .min(8, 'Mật khẩu ít nhất 8 ký tự.')
        .max(20, 'Mật khẩu nhiều nhất 20 ký tự.')
        .oneOf([Yup.ref('newPassword'), null], 'Mật khẩu nhập lại không đúng.'),
    }),
    onSubmit: (values) => {
      const { newPassword, confirmPassword, password } = values;
      if (password !== '' && newPassword === '') {
        formik.setErrors({ newPassword: 'Vui lòng nhập mật khẩu mới.' });
        return;
      }
      if (password === '' && newPassword !== '') {
        formik.setErrors({ password: 'Vui lòng nhập mật khẩu cũ.' });
        return;
      }
      if (newPassword !== '' && confirmPassword === '') {
        formik.setErrors({ confirmPassword: 'Vui lòng nhập lại mật khẩu.' });
        return;
      }
      dispatch(doiMatKhauRequest(values));
    },
  });

  useEffect(() => {
    if (userData) {
      formik.setFieldValue('email', userData?.email || '');
    }
  }, [userData]);

  useEffect(() => {
    if (isDoiMatKhauSuccess) {
      formik.setFieldValue('password', '*');
      formik.setFieldValue('newPassword', '*');
      formik.setFieldValue('confirmPassword', '*');
    }
  }, [isDoiMatKhauSuccess]);

  return (
    <>
      <div className="thong-tin-ca-nhan">
        <Form noValidate onSubmit={formik.handleSubmit}>
          <Row>
            <div className="flex-start-center">
              <Col lg={4}>
                {isDoiMatKhauFailure && (
                  <div className="form-error-msg mt-4">
                    {errorMessages[0]?.message?.includes(
                      'Incorrect username or password.',
                    )
                      ? 'Nhập sai mật khẩu.'
                      : errorMessages[0]?.message}
                  </div>
                )}
                <InputText
                  labelFor="email"
                  labelContent="Email:"
                  id="email"
                  name="email"
                  disabled
                  value={formik.values.email}
                />
                <InputPassword
                  labelFor="password"
                  labelContent="Mật khẩu cũ:"
                  id="password"
                  name="password"
                  placeholder="********"
                  isRequired
                  {...formik.getFieldProps('password')}
                  isValid={formik.touched.password && !formik.errors.password}
                  isInvalid={formik.touched.password && formik.errors.password}
                  isError={formik.touched.password && formik.errors.password}
                  msgError={formik.errors.password}
                />
                <InputPassword
                  labelFor="newPassword"
                  labelContent="Mật khẩu mới:"
                  id="newPassword"
                  name="newPassword"
                  placeholder="********"
                  isRequired
                  {...formik.getFieldProps('newPassword')}
                  isValid={
                    formik.touched.newPassword && !formik.errors.newPassword
                  }
                  isInvalid={
                    formik.touched.newPassword && formik.errors.newPassword
                  }
                  isError={
                    formik.touched.newPassword && formik.errors.newPassword
                  }
                  msgError={formik.errors.newPassword}
                />
                <InputPassword
                  labelFor="confirmPassword"
                  labelContent="Nhật lại mật khẩu:"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="********"
                  isRequired
                  {...formik.getFieldProps('confirmPassword')}
                  isValid={
                    formik.touched.confirmPassword
                    && !formik.errors.confirmPassword
                  }
                  isInvalid={
                    formik.touched.confirmPassword
                    && formik.errors.confirmPassword
                  }
                  isError={
                    formik.touched.confirmPassword
                    && formik.errors.confirmPassword
                  }
                  msgError={formik.errors.confirmPassword}
                />
                <ButtonCustom
                  customClassName="d-block w-100 mt-4"
                  type="submit"
                  variant={isDoiMatKhauRequest ? 'disabled' : ''}
                >
                  {isDoiMatKhauRequest ? (
                    <Spinner animation="border" size="sm" />
                  ) : (
                    'Đổi mật khẩu'
                  )}
                </ButtonCustom>
              </Col>
            </div>
          </Row>
        </Form>
      </div>

      {(isDoiMatKhauRequest || isDoiMatKhauSuccess) && (
        <ToastSuccess
          show
          content="Đổi mật khẩu thành công"
          isLoading={isDoiMatKhauRequest}
          theme="dark"
          contentLoading="Đang đổi mật khẩu"
        />
      )}
    </>
  );
};

export default DoiMatKhau;
