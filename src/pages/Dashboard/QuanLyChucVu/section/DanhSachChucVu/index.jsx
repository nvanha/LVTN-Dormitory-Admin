import { useEffect, useMemo, useState } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import {
  CSExclamationCircleSolid,
  CSTrashSolid,
} from '~/components/iconography/Solid';
import TableShowAll from '~/components/table/tableShowAll';
import {
  danhSachChucVuRequest,
  resetQuanLyChucVuState,
} from '~/redux/quanLyChucVu/actions';
import ModalPreview from './components/ModalPreview';

const DanhSachChucVu = () => {
  const { isDanhSachChucVuRequest, danhSachChucVu } = useSelector(
    (store) => store.quanLyChucVu,
  );
  const dispatch = useDispatch();

  const [dataShow, setDataShow] = useState([]);
  const [isShowModalPreview, setIsShowModalPreview] = useState(false);
  const [dataActive, setDataActive] = useState(null);

  const columns = useMemo(
    () => [
      { Header: 'Tên chức vụ', accessor: 'tenChucVu' },
      {
        Header: 'Tình trạng',
        accessor: 'tinhTrang',
        Cell: ({ value }) => <div className="cs-text-center">{value}</div>,
      },
      {
        Header: 'Số lượng',
        accessor: 'soLuong',
        Cell: ({ value }) => <div className="cs-text-center">{value}</div>,
      },
      {
        Header: 'Chi tiết',
        accessor: '',
        Cell: () => (
          <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip id="tooltip-disabled">Xem chi tiết</Tooltip>}
          >
            <div
              className="cs-text-center btn-action hover-opacity cursor-pointer"
              onClick={() => setIsShowModalPreview(true)}
            >
              <CSExclamationCircleSolid customClassName="fill-white" />
            </div>
          </OverlayTrigger>
        ),
      },
      {
        Header: 'Xoá',
        accessor: '',
        Cell: () => (
          <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip id="tooltip-disabled">Xoá chức vụ</Tooltip>}
          >
            <div
              className="cs-text-center btn-action delete hover-opacity cursor-pointer"
              // onClick={() => swalNegativeConfirmation(
              //   'Huỷ yêu cầu thuê phòng',
              //   'Bạn muốn xác nhận huỷ yêu cầu thuê phòng này?',
              //   'Đồng ý',
              //   'Huỷ',
              //   () => handleXoaDonDangKy(row.values.ID),
              //   () => {},
              // )}
            >
              <CSTrashSolid customClassName="fill-white" />
            </div>
          </OverlayTrigger>
        ),
      },
    ],
    [],
  );

  const handleClickRow = (value) => {
    console.log('value: ', value);
    setDataActive(value);
  };

  useEffect(() => {
    dispatch(danhSachChucVuRequest());

    return () => {
      dispatch(resetQuanLyChucVuState());
    };
  }, []);

  useEffect(() => {
    if (danhSachChucVu?.Items?.length > 0) {
      setDataShow(danhSachChucVu?.Items);
    }
  }, [danhSachChucVu]);

  return (
    <div className="danh-sach-chuc-vu">
      <TableShowAll
        columns={columns}
        data={dataShow}
        isLoading={isDanhSachChucVuRequest}
        onClickRow={handleClickRow}
        isUseRowSelect={false}
      />

      {isShowModalPreview && (
        <ModalPreview
          show
          handleClose={() => {
            setIsShowModalPreview(false);
            setDataActive(null);
          }}
          data={dataActive}
        />
      )}
    </div>
  );
};

export default DanhSachChucVu;
