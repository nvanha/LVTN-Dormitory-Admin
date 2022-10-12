import { Storage } from 'aws-amplify';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import {
  Col, Form, Row, Spinner,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';
import * as Yup from 'yup';

import avtStaticURL from '~/assets/avtStatic.svg';
import { ButtonCustom, InputText } from '~/components/form';
import { InputSelect, InputTextArea } from '~/components/form/inputCustom';
import InputDate from '~/components/form/inputCustom/inputDate/InputDate';
import { ToastSuccess } from '~/helpers/toastHelpers';
import { getUserDataRequest } from '~/redux/auth/actions';
import {
  capNhatThongTinTaiKhoanRequest,
  resetQuanLyTaiKhoanState,
} from '~/redux/quanLyTaiKhoan/actions';

const ThongTinCaNhan = () => {
  const { userData } = useSelector((store) => store.auth);
  const { isCapNhatThongTinTaiKhoanRequest, isCapNhatThongTinTaiKhoanSuccess } = useSelector((store) => store.quanLyTaiKhoan);
  const dispatch = useDispatch();

  const [mediaPath, setMediaPath] = useState();
  const [mediaName, setMediaName] = useState();
  const [isLoadingUploadMedia, setIsLoadingUpdateMedia] = useState(false);
  const [isUpdateAvt, setIsUpdateAvt] = useState(false);

  const formik = useFormik({
    initialValues: {
      ID: '',
      msnv: '',
      hoTen: '',
      email: '',
      hinhDaiDien: '',
      ngaySinh: '',
      diaChi: '',
      tenChucVu: '',
      gioiTinh: '',
      soDienThoai: '',
    },
    validationSchema: Yup.object({
      hoTen: Yup.string().trim().required('Vui lòng nhập họ tên.'),
      ngaySinh: Yup.string().trim().required('Vui lòng nhập ngày sinh.'),
      gioiTinh: Yup.string().trim().required('Vui lòng chọn giới tính.'),
      soDienThoai: Yup.string()
        .trim()
        .required('Vui lòng nhập số điện thoại.')
        .min(10, 'Số điện thoại gồm 10 số.')
        .max(10, 'Số điện thoại gồm 10 số.'),
    }),
    onSubmit: (values) => {
      const payload = {};
      payload.ID = values.ID;
      payload.hoTen = values.hoTen;
      payload.ngaySinh = values.ngaySinh;
      payload.soDienThoai = values.soDienThoai;
      payload.gioiTinh = values.gioiTinh;
      payload.diaChi = values.diaChi;
      dispatch(capNhatThongTinTaiKhoanRequest(payload));
    },
  });

  useEffect(
    () => () => {
      dispatch(resetQuanLyTaiKhoanState());
    },
    [],
  );

  useEffect(() => {
    if (userData) {
      formik.setFieldValue('ID', userData?.ID || '');
      formik.setFieldValue('msnv', userData?.msnv || '');
      formik.setFieldValue('hoTen', userData?.hoTen || '');
      formik.setFieldValue('email', userData?.email || '');
      formik.setFieldValue('hinhDaiDien', userData?.hinhDaiDien || '');
      formik.setFieldValue('ngaySinh', userData?.ngaySinh || '');
      formik.setFieldValue('diaChi', userData?.diaChi || '');
      formik.setFieldValue('tenChucVu', userData?.tenChucVu || '');
      formik.setFieldValue('gioiTinh', userData?.gioiTinh?.toString() || '');
      formik.setFieldValue('soDienThoai', userData?.soDienThoai || '');
    }
  }, [userData]);

  useEffect(() => {
    if (mediaPath && mediaName) {
      setIsLoadingUpdateMedia(false);
    }
  }, [mediaPath, mediaName]);

  const onUpdateAvt = async (e) => {
    dispatch(resetQuanLyTaiKhoanState());
    if (mediaPath || mediaName) {
      await Storage.remove(`dormitory-admin/nhan-vien/avt/${mediaName}`);
    }
    setIsLoadingUpdateMedia(true);
    const mediaNameTmp = `${uuid()}-harry-custom-${e.target.files[0].name}`;
    await Storage.put(
      `dormitory-admin/nhan-vien/avt/${mediaNameTmp}`,
      e.target.files[0],
      {
        resumable: true,
        completeCallback: async () => {
          const mediaPathTmp = await Storage.get(
            `dormitory-admin/nhan-vien/avt/${mediaNameTmp}`,
          );
          setMediaPath(mediaPathTmp);
        },
      },
    );
    setMediaName(mediaNameTmp);
  };

  const handleUpdateAvt = async () => {
    setIsUpdateAvt(true);
    await Storage.remove(
      `dormitory-admin/nhan-vien/avt/${userData?.hinhDaiDien?.substr(
        userData?.hinhDaiDien?.lastIndexOf('/dormitory-admin/nhan-vien/avt/')
          + '/dormitory-admin/nhan-vien/avt/'.length,
      )}`,
    );
    const object = {};
    object.ID = userData.ID;
    object.hinhDaiDien = mediaName;
    dispatch(capNhatThongTinTaiKhoanRequest(object));
  };

  useEffect(() => {
    if (isCapNhatThongTinTaiKhoanSuccess) {
      if (isUpdateAvt) {
        setMediaPath();
        setMediaName();
        setIsLoadingUpdateMedia(false);
        setIsUpdateAvt(false);
      }
      dispatch(getUserDataRequest({ email: formik.values.email }));
    }
  }, [isCapNhatThongTinTaiKhoanSuccess, isUpdateAvt]);

  return (
    <>
      <div className="thong-tin-ca-nhan">
        <Form noValidate onSubmit={formik.handleSubmit}>
          <Row>
            <Col lg={3}>
              <label
                htmlFor="avt"
                className="cs-fz-14 cs-fw-600 cs-text-black"
                style={{ width: '100px', margin: '16px 0 4px 0' }}
              >
                Hình ảnh:
              </label>
              <div className="avt" style={{ position: 'relative' }}>
                <img
                  src={mediaPath || formik.values.hinhDaiDien || avtStaticURL}
                  alt={formik.values.email?.concat('-avt')}
                />
                {isLoadingUploadMedia && (
                  <div
                    className="flex-center-center"
                    style={{
                      position: 'absolute',
                      top: '3px',
                      left: '3px',
                      width: 'calc(100% - 6px)',
                      height: 'calc(100% - 6px)',
                      backgroundColor: 'rgb(0 0 0 / 30%)',
                    }}
                  >
                    <Spinner animation="border" variant="warning" />
                  </div>
                )}
              </div>

              <ButtonCustom
                htmlFor="image"
                size="s"
                variant="line"
                customClassName="mt-4 mb-2"
                style={{ width: '150px', height: '50px', position: 'relative' }}
                disabled={
                  isLoadingUploadMedia || isCapNhatThongTinTaiKhoanRequest
                }
              >
                Tải ảnh
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={onUpdateAvt}
                  disabled={
                    isLoadingUploadMedia || isCapNhatThongTinTaiKhoanRequest
                  }
                  style={{
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    width: '100%',
                    height: '100%',
                    opacity: '0',
                    cursor: 'pointer',
                  }}
                />
              </ButtonCustom>
              {(mediaPath || mediaName) && (
                <ButtonCustom
                  htmlFor="image"
                  size="s"
                  variant="outline-secondary"
                  customClassName="mb-2"
                  style={{
                    width: '150px',
                    height: '50px',
                    position: 'relative',
                  }}
                  disabled={
                    isLoadingUploadMedia || isCapNhatThongTinTaiKhoanRequest
                  }
                  onClick={handleUpdateAvt}
                >
                  Lưu ảnh
                </ButtonCustom>
              )}
            </Col>
            <Col lg={4}>
              <InputText
                labelFor="msnv"
                labelContent="MSNV:"
                id="msnv"
                name="msnv"
                disabled
                value={formik.values.msnv}
              />
              <InputText
                labelFor="email"
                labelContent="Email:"
                id="email"
                name="email"
                disabled
                value={formik.values.email}
              />
              <InputText
                labelFor="tenChucVu"
                labelContent="Tên chức vụ:"
                id="tenChucVu"
                name="tenChucVu"
                disabled
                value={formik.values.tenChucVu || 'Trống'}
              />
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
            </Col>
            <Col lg={4}>
              <InputText
                labelFor="soDienThoai"
                labelContent="Số điện thoại:"
                id="soDienThoai"
                name="soDienThoai"
                placeholder="08xxxxxxxx"
                isRequired
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
            </Col>
          </Row>
          <Row>
            <Col lg={3} />
            <Col lg={4}>
              <ButtonCustom customClassName="d-block w-100 mt-4" type="submit">
                Lưu
              </ButtonCustom>
            </Col>
          </Row>
        </Form>
      </div>

      {(isCapNhatThongTinTaiKhoanRequest
        || isCapNhatThongTinTaiKhoanSuccess) && (
        <ToastSuccess
          show
          content="Cập nhật thông tin thành công"
          isLoading={isCapNhatThongTinTaiKhoanRequest}
          theme="dark"
          contentLoading="Đang cập nhật thông tin"
        />
      )}
    </>
  );
};
export default ThongTinCaNhan;
