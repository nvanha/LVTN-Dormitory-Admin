import { useFormik } from 'formik';
import { useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import * as Yup from 'yup';

import { ReactComponent as LoadingIcon } from '~/assets/icon/general/loading.svg';
import { ReactComponent as LoginImage } from '~/assets/illustration/login.svg';
import LogoURL from '~/assets/logo/logo.png';
import BoxContent from '~/components/boxContent/BoxContent';
import { ButtonCustom, InputPassword, InputText } from '~/components/form';
import Helmet from '~/components/helmet/Helmet';
import { signInRequest } from '~/redux/auth/actions';

const LoginPage = () => {
  const {
    isSignInRequest, isSignInSuccess, isSignInFailure, errorMessages,
  } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().trim().required('Vui lòng nhập địa chỉ email.'),
      password: Yup.string()
        .trim()
        .required('Vui lòng nhập mật khẩu.')
        .min(8, 'Mật khẩu có ít nhất 8 ký tự.')
        .max(20, 'Mật khẩu có nhiều nhất 20 ký tự.'),
    }),
    onSubmit: (values) => {
      const object = {};
      object.username = values.email;
      object.password = values.password;
      dispatch(signInRequest(object));
    },
  });

  useEffect(() => {
    if (isSignInSuccess) {
      history.push('/');
    }
  }, [history, isSignInSuccess]);

  return (
    <Helmet title="Đăng nhập">
      <div className="login-page flex-center-center">
        <div className="login-page--left flex-center-center">
          <BoxContent>
            <Form
              noValidate
              onSubmit={formik.handleSubmit}
              className="login-page--form"
            >
              <Link to="/">
                <img src={LogoURL} alt="harry-logo" width={75} />
              </Link>
              <h1 className="cs-text-primary cs-fz-32 cs-weight-600 mt-4">
                Hệ thống quản lý ký túc xá
              </h1>
              <p className="cs-text-secondary cs-fz-18 cs-weight-400 mt-2">
                Chào mừng trở lại! Xin hãy đăng nhập vào tài khoản của bạn.
              </p>
              <div className="login-page--profile-card">
                {isSignInFailure && (
                  <div
                    className="form-error-msg"
                    style={{ marginBottom: '10px' }}
                  >
                    {errorMessages[0]?.message}
                  </div>
                )}
                <InputText
                  labelFor="email"
                  labelContent="Email"
                  id="email"
                  name="email"
                  placeholder="example@gmail.com"
                  isRequired
                  {...formik.getFieldProps('email')}
                  isValid={formik.touched.email && !formik.errors.email}
                  isInvalid={formik.touched.email && formik.errors.email}
                  isError={formik.touched.email && formik.errors.email}
                  msgError={formik.errors.email}
                />
                <InputPassword
                  labelFor="password"
                  labelContent="Mật khẩu"
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
                <div className="flex-center-center mt-4 w-100">
                  <ButtonCustom
                    variant={isSignInRequest ? 'disabled' : ''}
                    type="submit"
                    size="s"
                    style={{ width: '150px', height: '50px' }}
                  >
                    {isSignInRequest ? <LoadingIcon /> : 'Đăng nhập'}
                  </ButtonCustom>
                </div>
              </div>
            </Form>
          </BoxContent>
        </div>
        <div className="login-page--right">
          <LoginImage />
        </div>
      </div>
    </Helmet>
  );
};

export default LoginPage;
