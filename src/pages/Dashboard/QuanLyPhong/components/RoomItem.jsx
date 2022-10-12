import { OverlayTrigger, Tooltip } from 'react-bootstrap';

import { ReactComponent as FemaleUser } from '~/assets/components/roomItem/FemaleUser.svg';
import { ReactComponent as MaleUser } from '~/assets/components/roomItem/MaleUser.svg';
import Grid from '~/components/grid/Grid';

const RoomItem = ({ data, handleOpenModalPreview }) => {
  const isEmptyCheck = data.tinhTrangPhong === 0;

  return (
    <OverlayTrigger
      placement="top"
      overlay={
        isEmptyCheck ? (
          <Tooltip id="tooltip-disabled">Phòng trống</Tooltip>
        ) : (
          <></>
        )
      }
    >
      <div className={`room-item--wrapper ${isEmptyCheck ? 'empty' : ''}`}>
        <div className="room-item--inner">
          <Grid col={3}>
            {data.danhSachSinhVien.map((item) => (
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
                <span
                  onClick={() => handleOpenModalPreview({
                    dataPhong: data,
                    dataActive: item.ID,
                  })}
                >
                  {data.khuNha === 'A' ? (
                    <MaleUser className="active" />
                  ) : (
                    <FemaleUser className="active" />
                  )}
                </span>
              </OverlayTrigger>
            ))}
            {[...new Array(data.soLuongGiuong - data.tinhTrangPhong)].map(
              (item, index) => (
                <OverlayTrigger
                  key={index}
                  placement="right"
                  overlay={
                    <Tooltip id="tooltip-disabled">Giường trống</Tooltip>
                  }
                >
                  <span style={{ cursor: 'no-drop' }}>
                    {data.khuNha === 'A' ? <MaleUser /> : <FemaleUser />}
                  </span>
                </OverlayTrigger>
              ),
            )}
          </Grid>
        </div>
        <div className="room-item--id cs-fz-12 cs-fw-500 cs-text-white">
          {data.maPhong}
        </div>
      </div>
    </OverlayTrigger>
  );
};

export default RoomItem;
