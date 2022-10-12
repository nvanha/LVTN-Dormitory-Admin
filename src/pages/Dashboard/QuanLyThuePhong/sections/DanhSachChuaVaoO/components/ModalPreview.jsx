import { useFormik } from 'formik';
import moment from 'moment';
import { Form, Modal } from 'react-bootstrap';
import * as Yup from 'yup';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ButtonCustom, InputText } from '~/components/form';
import InputDate from '~/components/form/inputCustom/inputDate/InputDate';
import Grid from '~/components/grid/Grid';
import SkeletonCustom from '~/components/skeleton/SkeletonCustom';
import {
  getDanhSachPhongTrongRequest,
  resetDanhSachPhongTrongState,
} from '~/redux/quanLyPhong/actions';
import { duyetDonVaoORequest } from '~/redux/quanLyThuePhong/actions';
import avtStaticURL from '~/assets/avtStatic.svg';
import RoomItem from './RoomItem';

const ModalPreview = ({ show, handleClose, data }) => {
  const { isGetDanhSachPhongTrongRequest, danhSachPhongTrongState } = useSelector((store) => store.quanLyPhong);
  const dispatch = useDispatch();

  const [danhSachPhong, setDanhSachPhong] = useState([]);

  const formik = useFormik({
    initialValues: {
      ID: data.ID || '',
      hinhDaiDien: data.hinhDaiDien || '',
      mssv: data.mssv || '',
      hoTen: data.hoTen || '',
      email: data.email || '',
      soDienThoai: data.soDienThoai || '',
      cccd: data.cccd || '',
      ngaySinh: data.ngaySinh || '',
      gioiTinh: data.gioiTinh || '',
      queQuan: data.queQuan || '',
      danToc: data.danToc || '',
      tonGiao: data.tonGiao || '',
      nganh: data.nganh || '',
      khoa: data.khoa || '',
      khoaNganh: data.khoaNganh || '',
      nienKhoa: data.nienKhoa || '',
      khuNha: data.khuNha || '',
      kyHan: data.kyHan || '',
      ngayLap: data.ngayLap || '',
      //
      ngayBatDau: '',
      ngayKetThuc: '',
      maPhong: '',
      maNhanVien: 'Demo123',
    },
    validationSchema: Yup.object({
      ngayBatDau: Yup.string().trim().required('Vui lòng chọn ngày bắt đầu.'),
      maPhong: Yup.string().trim().required('Vui lòng chọn phòng.'),
    }),
    onSubmit: (values) => {
      const params = {};
      params.maHopDong = values.ID;
      params.maPhong = values.maPhong;
      params.mssv = values.mssv;
      params.ngayBatDau = values.ngayBatDau;
      params.ngayKetThuc = values.ngayKetThuc;
      params.maNhanVien = values.maNhanVien;
      dispatch(duyetDonVaoORequest(params));
    },
  });

  const handleSelectRoom = (maPhong) => {
    formik.setFieldValue('maPhong', maPhong);
  };

  useEffect(() => {
    dispatch(getDanhSachPhongTrongRequest({ khuNha: data.khuNha }));

    return () => {
      setDanhSachPhong([]);
      dispatch(resetDanhSachPhongTrongState());
    };
  }, []);

  useEffect(() => {
    if (danhSachPhongTrongState) {
      setDanhSachPhong(danhSachPhongTrongState?.Items);
    }
  }, [danhSachPhongTrongState]);

  useEffect(() => {
    if (formik.values.ngayBatDau) {
      formik.setFieldValue(
        'ngayKetThuc',
        moment(
          new Date(
            new Date(formik.values.ngayBatDau).setMonth(
              new Date(formik.values.ngayBatDau).getMonth()
                + formik.values.kyHan,
            ),
          ),
        ).format('YYYY-MM-DD'),
      );
    }
  }, [formik.values.ngayBatDau]);

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      className="modal-preview-room quan-ly-thue-phong danh-sach-chua-vao-o"
    >
      <Form noValidate onSubmit={formik.handleSubmit}>
        <Modal.Header closeButton>
          <h1 className="cs-fz-32 cs-fw-600 cs-text-black mb-0">
            Duyệt chỗ ở cho sinh viên
          </h1>
        </Modal.Header>
        <Modal.Body>
          <div
            className="flex-stretch-start modal-preview-room--wrapper"
            style={{ gap: '15px' }}
          >
            <div className="modal-preview-room--content__left">
              <div className="flex-center-start" style={{ gap: '10px' }}>
                <label
                  htmlFor="avt"
                  className="cs-fz-14 cs-fw-600 cs-text-black"
                  style={{ width: '170px' }}
                >
                  Hình ảnh:
                </label>
                <div className="avt">
                  <img
                    src={formik.values.hinhDaiDien || avtStaticURL}
                    alt={formik.values.email.concat('-avt')}
                  />
                </div>
              </div>
              <InputText
                labelFor="mssv"
                labelContent="MSSV:"
                value={data.mssv}
                disabled
              />
              <InputText
                labelFor="hoTen"
                labelContent="Họ và tên:"
                value={data.hoTen}
                disabled
              />
              <InputText
                labelFor="email"
                labelContent="Email:"
                value={data.email}
                disabled
              />
              <InputText
                labelFor="soDienThoai"
                labelContent="Số điện thoại:"
                value={data.soDienThoai}
                disabled
              />
              <InputText
                labelFor="cccd"
                labelContent="Căn cước công dân:"
                value={data.cccd}
                disabled
              />
              <InputDate
                labelFor="ngaySinh"
                labelContent="Ngày sinh:"
                value={data.ngaySinh}
                disabled
              />
              <InputText
                labelFor="gioiTinh"
                labelContent="Giới tính:"
                value={data.gioiTinh ? 'Nữ' : 'Nam'}
                disabled
              />
              <InputText
                labelFor="queQuan"
                labelContent="Quê quán:"
                value={data.queQuan}
                disabled
              />
              <InputText
                labelFor="danToc"
                labelContent="Dân tộc:"
                value={data.danToc}
                disabled
              />
              <InputText
                labelFor="tonGiao"
                labelContent="Tôn giáo:"
                value={data.tonGiao || 'Không'}
                disabled
              />
              <InputText
                labelFor="lop"
                labelContent="Lớp:"
                value={data.lop}
                disabled
              />
              <InputText
                labelFor="nganh"
                labelContent="Ngành:"
                value={data.nganh}
                disabled
              />
              <InputText
                labelFor="khoa"
                labelContent="Khoa:"
                value={`K${data.khoa}`}
                disabled
              />
              <InputText
                labelFor="khoaNganh"
                labelContent="Khoa:"
                value={data.khoaNganh}
                disabled
              />
              <InputText
                labelFor="nienKhoa"
                labelContent="Niên khoá:"
                value={data.nienKhoa}
                disabled
              />
            </div>
            <div className="modal-preview-room--content__right">
              <InputDate
                labelFor="ngayLap"
                labelContent="Ngày lập đơn:"
                value={moment(data.ngayLap).format('YYYY-MM-DD')}
                disabled
              />
              <InputText
                labelFor="khuNha"
                labelContent="Khu nhà:"
                value={data.khuNha}
                disabled
              />
              <InputText
                labelFor="kyHan"
                labelContent="Số tháng thuê:"
                value={data.kyHan}
                disabled
              />
              <InputDate
                labelFor="ngayBatDau"
                labelContent="Ngày bắt đầu:"
                id="ngayBatDau"
                name="ngayBatDau"
                isRequired
                {...formik.getFieldProps('ngayBatDau')}
                isValid={formik.touched.ngayBatDau && !formik.errors.ngayBatDau}
                isInvalid={
                  formik.touched.ngayBatDau && formik.errors.ngayBatDau
                }
                isError={formik.touched.ngayBatDau && formik.errors.ngayBatDau}
                msgError={formik.errors.ngayBatDau}
              />
              <InputDate
                labelFor="ngayKetThuc"
                labelContent="Ngày kết thúc:"
                disabled
                {...formik.getFieldProps('ngayKetThuc')}
              />
              <InputText
                labelFor="maPhong"
                labelContent="Mã phòng:"
                id="maPhong"
                name="maPhong"
                placeholder="Vui lòng chọn phòng bên dưới"
                isRequired
                readOnly
                {...formik.getFieldProps('maPhong')}
                isValid={formik.touched.maPhong && !formik.errors.maPhong}
                isInvalid={formik.touched.maPhong && formik.errors.maPhong}
                isError={formik.touched.maPhong && formik.errors.maPhong}
                msgError={formik.errors.maPhong}
              />
              <h2
                className="cs-fz-24 cs-fw-500 cs-text-black mt-4 mb-4 pt-2"
                style={{ borderTop: '1px solid #dddddd' }}
              >
                Danh sách phòng còn trống - Khu {data.khuNha}
              </h2>
              <Grid col={4} gap={10}>
                {isGetDanhSachPhongTrongRequest
                  ? [...new Array(20)]?.map((item, index) => (
                    <SkeletonCustom
                      key={index}
                      length={1}
                      width="100%"
                      height="120px"
                    />
                  ))
                  : danhSachPhong?.map((item) => (
                    <RoomItem
                      key={item.ID}
                      data={item}
                      roomActive={formik.values.maPhong}
                      handleSelectRoom={handleSelectRoom}
                    />
                  ))}
              </Grid>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <ButtonCustom type="submit" customClassName="d-block w-100">
            Thêm
          </ButtonCustom>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default ModalPreview;
