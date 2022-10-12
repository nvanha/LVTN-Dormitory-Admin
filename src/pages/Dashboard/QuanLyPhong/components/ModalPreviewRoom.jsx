import moment from 'moment';
import { useState } from 'react';
import { Modal, OverlayTrigger, Tooltip } from 'react-bootstrap';

import { ReactComponent as FemaleUser } from '~/assets/components/roomItem/FemaleUser.svg';
import { ReactComponent as MaleUser } from '~/assets/components/roomItem/MaleUser.svg';
import { InputText } from '~/components/form';
import InputDate from '~/components/form/inputCustom/inputDate/InputDate';
import Grid from '~/components/grid/Grid';
import { CSCheckCircleOutline } from '~/components/iconography/Outline';
import avtStaticURL from '~/assets/avtStatic.svg';

const ModalPreviewRoom = ({ show, handleClose, data }) => {
  const { dataPhong, dataActive } = data;

  const [dataShow, setDataShow] = useState(
    dataPhong.danhSachSinhVien.find((item) => item.ID === dataActive),
  );

  const handleChangeDataActive = (id) => {
    setDataShow(dataPhong.danhSachSinhVien.find((item) => item.ID === id));
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      className="modal-preview-room"
    >
      <Modal.Header closeButton>
        <h1 className="cs-fz-32 cs-fw-600 cs-text-black mb-0">
          Phòng {dataPhong.maPhong} - Khu Nhà {dataPhong.khuNha}
        </h1>
      </Modal.Header>
      <Modal.Body>
        <div className="flex-start-space" style={{ gap: '15px' }}>
          <div className="modal-preview-room--content__left">
            <div className="room-item--wrapper">
              <div className="room-item--inner">
                <Grid col={3}>
                  {dataPhong.danhSachSinhVien.map((item) => (
                    <OverlayTrigger
                      key={item.ID}
                      placement="right"
                      overlay={(
                        <Tooltip id="tooltip-disabled">
                          <p style={{ textAlign: 'left', margin: 0 }}>
                            Họ tên: {item.hoTen}
                            <br />
                            MSSV: {item.mssv}
                            <br />
                            Ngành: {item.nganh}
                          </p>
                        </Tooltip>
                      )}
                    >
                      <span onClick={() => handleChangeDataActive(item.ID)}>
                        {item.gioiTinh ? (
                          <FemaleUser className="active" />
                        ) : (
                          <MaleUser className="active" />
                        )}
                        {item.ID === dataShow.ID && (
                          <CSCheckCircleOutline customClassName="user-active" />
                        )}
                      </span>
                    </OverlayTrigger>
                  ))}
                  {[
                    ...new Array(
                      dataPhong.soLuongGiuong - dataPhong.tinhTrangPhong,
                    ),
                  ].map((item, index) => (
                    <OverlayTrigger
                      key={index}
                      placement="right"
                      overlay={
                        <Tooltip id="tooltip-disabled">Giường trống</Tooltip>
                      }
                    >
                      <span style={{ cursor: 'no-drop' }}>
                        {dataPhong.khuNha === 'A' ? (
                          <MaleUser />
                        ) : (
                          <FemaleUser />
                        )}
                      </span>
                    </OverlayTrigger>
                  ))}
                </Grid>
              </div>
            </div>
          </div>
          <div className="modal-preview-room--content__right">
            <div className="flex-center-start" style={{ gap: '10px' }}>
              <label
                htmlFor="avt"
                className="cs-fz-14 cs-fw-600 cs-text-black"
                style={{ width: '100px' }}
              >
                Hình ảnh:
              </label>
              <div className="avt">
                <img
                  src={dataShow.hinhDaiDien || avtStaticURL}
                  alt={dataShow.email.concat('-avt')}
                />
              </div>
            </div>
            <InputText
              labelFor="mssv"
              labelContent="MSSV:"
              value={dataShow.mssv}
              disabled
            />
            <InputText
              labelFor="hoTen"
              labelContent="Họ và tên:"
              value={dataShow.hoTen}
              disabled
            />
            <InputText
              labelFor="email"
              labelContent="Email:"
              value={dataShow.email}
              disabled
            />
            <InputText
              labelFor="soDienThoai"
              labelContent="Số điện thoại:"
              value={dataShow.soDienThoai}
              disabled
            />
            <InputText
              labelFor="cccd"
              labelContent="Căn cước công dân:"
              value={dataShow.cccd}
              disabled
            />
            <InputDate
              labelFor="ngaySinh"
              labelContent="Ngày sinh:"
              value={dataShow.ngaySinh}
              disabled
            />
            <InputText
              labelFor="gioiTinh"
              labelContent="Giới tính:"
              value={dataShow.gioiTinh ? 'Nữ' : 'Nam'}
              disabled
            />
            <InputText
              labelFor="queQuan"
              labelContent="Quê quán:"
              value={dataShow.queQuan}
              disabled
            />
            <InputText
              labelFor="danToc"
              labelContent="Dân tộc:"
              value={dataShow.danToc}
              disabled
            />
            <InputText
              labelFor="tonGiao"
              labelContent="Tôn giáo:"
              value={dataShow.tonGiao || 'Không'}
              disabled
            />
            <InputText
              labelFor="lop"
              labelContent="Lớp:"
              value={dataShow.lop}
              disabled
            />
            <InputText
              labelFor="nganh"
              labelContent="Ngành:"
              value={dataShow.nganh}
              disabled
            />
            <InputText
              labelFor="khoa"
              labelContent="Khóa:"
              value={`K${dataShow.khoa}`}
              disabled
            />
            <InputText
              labelFor="khoaNganh"
              labelContent="Khoa:"
              value={dataShow.khoaNganh}
              disabled
            />
            <InputText
              labelFor="nienKhoa"
              labelContent="Niên khoá:"
              value={dataShow.nienKhoa}
              disabled
            />
            <InputText
              labelFor="kyHan"
              labelContent="Số tháng thuê:"
              value={dataShow.kyHan}
              disabled
            />
            <InputDate
              labelFor="ngayBatDau"
              labelContent="Ngày bắt đầu:"
              value={moment(dataShow.ngayBatDau).format('YYYY-MM-DD')}
              disabled
            />
            <InputDate
              labelFor="ngayKetThuc"
              labelContent="Ngày kết thúc:"
              value={moment(dataShow.ngayKetThuc).format('YYYY-MM-DD')}
              disabled
            />
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ModalPreviewRoom;
