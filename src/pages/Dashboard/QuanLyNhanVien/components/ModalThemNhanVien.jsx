import { useFormik } from 'formik';
import { useEffect } from 'react';
import { Form, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

import { ButtonCustom, InputText } from '~/components/form';
import { InputSelect, InputTextArea } from '~/components/form/inputCustom';
import InputDate from '~/components/form/inputCustom/inputDate/InputDate';
import {
  getDanhSachChucVuTrongRequest,
  resetThemNhanVienState,
  themNhanVienRequest,
  xacNhanDangKyTaiKhoanNhanVienRequest,
} from '~/redux/quanLyNhanVien/actions';

const ModalThemNhanVien = ({ show, handleClose }) => {
  const {
    isThemNhanVienSuccess,
    isThemNhanVienFailure,
    isXacNhanDangKyTaiKhoanNhanVienFailure,
    isGetDanhSachChucVuTrongRequest,
    danhSachChucVuTrong,
    errorMessages,
  } = useSelector((store) => store.quanLyNhanVien);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      hoTen: '',
      email: '',
      ngaySinh: '',
      gioiTinh: '',
      diaChi: '',
      soDienThoai: '',
      maChucVu: '',
    },
    validationSchema: Yup.object({
      hoTen: Yup.string().trim().required('Vui lòng nhập họ tên.'),
      email: Yup.string()
        .trim()
        .required('Vui lòng nhập email.')
        .email('Địa chỉ email không hợp lệ.'),
      ngaySinh: Yup.string().trim().required('Vui lòng nhập ngày sinh.'),
      gioiTinh: Yup.string().trim().required('Vui lòng chọn giới tính.'),
      diaChi: Yup.string().trim(),
      soDienThoai: Yup.string()
        .trim()
        .required('Vui lòng nhập số điện thoại.')
        .min(10, 'Số điện thoại gồm 10 số.')
        .max(10, 'Số điện thoại gồm 10 số.'),
      maChucVu: Yup.string().trim(),
    }),
    onSubmit: (values) => {
      // const id = Math.floor(Math.random() * 100000000).toString();
      const data = {
        username: values.email,
        password: '123456789',
        attributes: {
          'custom:demo1': JSON.stringify(values),
        },
      };
      dispatch(themNhanVienRequest(data));
    },
  });

  const formikActive = useFormik({
    initialValues: {
      code: '',
    },
    validationSchema: Yup.object({
      code: Yup.string().trim().required('Vui lòng nhập mã code.'),
    }),
    onSubmit: (values) => {
      const data = {
        username: formik.values.email,
        code: values.code,
      };
      dispatch(xacNhanDangKyTaiKhoanNhanVienRequest(data));
    },
  });

  useEffect(() => {
    dispatch(resetThemNhanVienState());
    dispatch(getDanhSachChucVuTrongRequest());
  }, []);

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      className="modal-them-nhan-vien"
    >
      <Modal.Header closeButton>
        <h1 className="cs-fz-32 cs-fw-600 cs-text-black mb-0">
          Thêm nhân viên
        </h1>
      </Modal.Header>
      <Modal.Body>
        {!isThemNhanVienSuccess ? (
          <>
            <h4 className="cs-fz-20 cs-fw-600 cs-text-black">
              Nhập thông tin nhân viên
            </h4>
            {isThemNhanVienFailure && (
              <div className="form-error-msg" style={{ marginBottom: '10px' }}>
                {errorMessages[0]?.message}
              </div>
            )}
            <Form noValidate onSubmit={formik.handleSubmit}>
              <InputText
                labelFor="hoTen"
                labelContent="Họ & tên:"
                id="hoTen"
                name="hoTen"
                placeholder="Nguyen Van A"
                isRequired
                {...formik.getFieldProps('hoTen')}
                isValid={formik.touched.hoTen && !formik.errors.hoTen}
                isInvalid={formik.touched.hoTen && formik.errors.hoTen}
                isError={formik.touched.hoTen && formik.errors.hoTen}
                msgError={formik.errors.hoTen}
              />
              <InputText
                labelFor="email"
                labelContent="Email:"
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
              <InputDate
                labelFor="ngaySinh"
                labelContent="Ngày sinh:"
                id="ngaySinh"
                name="ngaySinh"
                isRequired
                {...formik.getFieldProps('ngaySinh')}
                isValid={formik.touched.ngaySinh && !formik.errors.ngaySinh}
                isInvalid={formik.touched.ngaySinh && formik.errors.ngaySinh}
                isError={formik.touched.ngaySinh && formik.errors.ngaySinh}
                msgError={formik.errors.ngaySinh}
              />
              <InputSelect
                labelFor="gioiTinh"
                labelContent="Giới tính:"
                id="gioiTinh"
                name="gioiTinh"
                isRequired
                {...formik.getFieldProps('gioiTinh')}
                isValid={formik.touched.gioiTinh && !formik.errors.gioiTinh}
                isInvalid={formik.touched.gioiTinh && formik.errors.gioiTinh}
                isError={formik.touched.gioiTinh && formik.errors.gioiTinh}
                msgError={formik.errors.gioiTinh}
              >
                <option value="">---</option>
                <option value={0}>Nam</option>
                <option value={1}>Nữ</option>
              </InputSelect>
              <InputTextArea
                labelFor="diaChi"
                labelContent="Địa chỉ:"
                id="diaChi"
                name="diaChi"
                placeholder="Can Tho..."
                fieldLength={formik?.values?.diaChi?.length}
                {...formik.getFieldProps('diaChi')}
                isValid={formik.touched.diaChi && !formik.errors.diaChi}
                isInvalid={formik.touched.diaChi && formik.errors.diaChi}
                isError={formik.touched.diaChi && formik.errors.diaChi}
                msgError={formik.errors.diaChi}
              />
              <InputText
                labelFor="soDienThoai"
                labelContent="Số điện thoại:"
                id="soDienThoai"
                name="soDienThoai"
                isRequired
                placeholder="08xxxxxxxx"
                {...formik.getFieldProps('soDienThoai')}
                isValid={
                  formik.touched.soDienThoai && !formik.errors.soDienThoai
                }
                isInvalid={
                  formik.touched.soDienThoai && formik.errors.soDienThoai
                }
                isError={
                  formik.touched.soDienThoai && formik.errors.soDienThoai
                }
                msgError={formik.errors.soDienThoai}
              />
              <InputSelect
                labelFor="maChucVu"
                labelContent="Chức vụ:"
                id="maChucVu"
                name="maChucVu"
                disabled={isGetDanhSachChucVuTrongRequest}
                {...formik.getFieldProps('maChucVu')}
                isValid={formik.touched.maChucVu && !formik.errors.maChucVu}
                isInvalid={formik.touched.maChucVu && formik.errors.maChucVu}
                isError={formik.touched.maChucVu && formik.errors.maChucVu}
                msgError={formik.errors.maChucVu}
              >
                <option value="">---</option>
                {danhSachChucVuTrong?.Items?.map((data) => (
                  <option key={data.ID} value={data.ID}>
                    {data.tenChucVu}
                  </option>
                ))}
              </InputSelect>
              <div className="flex-center-center mt-4 w-100">
                <ButtonCustom
                  type="submit"
                  size="s"
                  style={{ width: '100%', height: '50px' }}
                >
                  Tạo
                </ButtonCustom>
              </div>
            </Form>
          </>
        ) : (
          <>
            <h4 className="cs-fz-20 cs-fw-600 cs-text-black">
              Nhập mã kích hoạt
            </h4>
            <p className="cs-color-black cs-fz-16">
              Mã kích hoạt đã được gửi qua địa chỉ email{' '}
              <span className="cs-fw-600">{formik.values.email}</span>
            </p>
            {isXacNhanDangKyTaiKhoanNhanVienFailure && (
              <div className="form-error-msg" style={{ marginBottom: '10px' }}>
                {errorMessages[0]?.message?.includes(
                  'Invalid verification code',
                )
                  ? 'Mã xác minh được cung cấp không hợp lệ, vui lòng thử lại.'
                  : errorMessages[0]?.message}
              </div>
            )}
            <Form noValidate onSubmit={formikActive.handleSubmit}>
              <InputText
                labelFor="code"
                labelContent="Mã code:"
                id="code"
                name="code"
                placeholder="xxxxxx"
                isRequired
                {...formikActive.getFieldProps('code')}
                isValid={formikActive.touched.code && !formikActive.errors.code}
                isInvalid={
                  formikActive.touched.code && formikActive.errors.code
                }
                isError={formikActive.touched.code && formikActive.errors.code}
                msgError={formikActive.errors.code}
              />
              <div className="flex-center-center mt-4 w-100">
                <ButtonCustom
                  type="submit"
                  size="s"
                  style={{ width: '100%', height: '50px' }}
                >
                  Tạo
                </ButtonCustom>
              </div>
            </Form>
          </>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default ModalThemNhanVien;
