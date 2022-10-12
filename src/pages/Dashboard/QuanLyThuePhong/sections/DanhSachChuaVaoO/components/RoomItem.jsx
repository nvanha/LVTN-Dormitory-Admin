import { OverlayTrigger, Tooltip } from 'react-bootstrap';

import { ReactComponent as FemaleUser } from '~/assets/components/roomItem/FemaleUser.svg';
import { ReactComponent as MaleUser } from '~/assets/components/roomItem/MaleUser.svg';
import Grid from '~/components/grid/Grid';

const RoomItem = ({ data, roomActive, handleSelectRoom }) => {
  const isEmptyCheck = data.tinhTrangPhong === 0;

  return (
    <OverlayTrigger
      placement="top"
      overlay={
        roomActive === data.maPhong ? (
          <Tooltip id="tooltip-disabled">Đã chọn</Tooltip>
        ) : isEmptyCheck ? (
          <Tooltip id="tooltip-disabled">Phòng trống</Tooltip>
        ) : (
          <Tooltip id="tooltip-disabled">
            Còn trống: {data.soLuongGiuong - data.tinhTrangPhong}/
            {data.soLuongGiuong}
          </Tooltip>
        )
      }
    >
      <div
        className={`room-item--wrapper ${
          roomActive === data.maPhong ? 'active' : ''
        }`}
        onClick={() => handleSelectRoom(data.maPhong)}
      >
        <div className="room-item--inner">
          <Grid col={3}>
            {[...new Array(data.tinhTrangPhong)].map((item, index) => (
              <span key={index}>
                {data.khuNha === 'A' ? (
                  <MaleUser className="active" />
                ) : (
                  <FemaleUser className="active" />
                )}
              </span>
            ))}
            {[...new Array(data.soLuongGiuong - data.tinhTrangPhong)].map(
              (item, index) => (
                <span key={index}>
                  {data.khuNha === 'A' ? <MaleUser /> : <FemaleUser />}
                </span>
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
