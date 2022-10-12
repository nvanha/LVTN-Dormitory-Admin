import moment from 'moment';
import React from 'react';
import { Offcanvas } from 'react-bootstrap';
import { InputText } from '~/components/form';
import { InputTextArea } from '~/components/form/inputCustom';
import InputDate from '~/components/form/inputCustom/inputDate/InputDate';
import avtStaticURL from '~/assets/avtStatic.svg';

const ModalChiTietNhanVien = ({ show, handleClose, data }) => (
  <Offcanvas
    show={show}
    onHide={handleClose}
    placement="end"
    className="modal-chi-tiet-nhan-vien"
  >
    <Offcanvas.Header closeButton>
      <Offcanvas.Title>
        <h4 className="cs-fz-28 cs-fw-500 cs-text-black mb-0">
          Chi tiết nhân viên
        </h4>
      </Offcanvas.Title>
    </Offcanvas.Header>
    <Offcanvas.Body>
      <div className="avt">
        <img src={data.hinhDaiDien || avtStaticURL} alt={data.msnv.concat('-avt')} />
      </div>
      <InputText
        labelFor="msnv"
        labelContent="Mã nhân viên:"
        value={data.msnv}
        disabled
      />
      <InputText
        labelFor="hoTen"
        labelContent="Họ & tên:"
        value={data.hoTen}
        disabled
      />
      <InputDate
        labelFor="ngaySinh"
        labelContent="Ngày sinh:"
        value={moment(data.ngaySinh).format('YYYY-MM-DD')}
        disabled
      />
      <InputText
        labelFor="gioiTinh"
        labelContent="Giới tính:"
        value={data.gioiTinh ? 'Nữ' : 'Nam'}
        disabled
      />
      <InputTextArea
        labelFor="diaChi"
        labelContent="Địa chỉ:"
        value={data.diaChi}
        fieldLength={data.diaChi.length}
        disabled
      />
      <InputText
        labelFor="soDienThoai"
        labelContent="Số điện thoại:"
        value={data.soDienThoai}
        disabled
      />
      <InputText
        labelFor="chucVu"
        labelContent="Chức vụ:"
        value={data.tenChucVu}
        disabled
      />
    </Offcanvas.Body>
  </Offcanvas>
);

export default ModalChiTietNhanVien;
