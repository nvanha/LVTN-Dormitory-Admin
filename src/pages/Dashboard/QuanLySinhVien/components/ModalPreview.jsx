import moment from 'moment';
import { Modal } from 'react-bootstrap';

import { InputText } from '~/components/form';
import InputDate from '~/components/form/inputCustom/inputDate/InputDate';
import avtStaticURL from '~/assets/avtStatic.svg';

const ModalPreview = ({ show, handleClose, data }) => (
  <Modal
    show={show}
    onHide={handleClose}
    centered
    className="modal-preview-room quan-ly-sinh-vien"
  >
    <Modal.Header closeButton>
      <h1 className="cs-fz-32 cs-fw-600 cs-text-black mb-0">
        Thông tin chi tiết
      </h1>
    </Modal.Header>
    <Modal.Body>
      <div className="flex-stretch-space" style={{ gap: '15px' }}>
        <div className="modal-preview-room--content__left">
          <div className="flex-center-start" style={{ gap: '10px' }}>
            <label
              htmlFor="avt"
              className="cs-fz-14 cs-fw-600 cs-text-black"
              style={{ width: '100px' }}
            >
              Hình ảnh:
            </label>
            <div className="avt">
              <img src={data.hinhDaiDien || avtStaticURL} alt={data.email.concat('-avt')} />
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
        </div>
        <div className="modal-preview-room--content__right">
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
          <InputText
            labelFor="maPhong"
            labelContent="Mã phòng:"
            value={data.maPhong}
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
            value={moment(data.ngayBatDau).format('YYYY-MM-DD')}
            disabled
          />
          <InputDate
            labelFor="ngayKetThuc"
            labelContent="Ngày kết thúc:"
            value={moment(data.ngayKetThuc).format('YYYY-MM-DD')}
            disabled
          />
        </div>
      </div>
    </Modal.Body>
  </Modal>
);

export default ModalPreview;
