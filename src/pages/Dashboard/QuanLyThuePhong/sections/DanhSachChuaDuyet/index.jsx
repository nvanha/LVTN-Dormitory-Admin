import moment from 'moment';
import { useEffect, useMemo, useState } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import {
  CSExclamationCircleSolid,
  CSPencilAltSolid,
  CSTrashSolid,
} from '~/components/iconography/Solid';
import TableShowAll from '~/components/table/tableShowAll';
import { swalNegativeConfirmation, swalWarning } from '~/helpers/swalHelpers';
import { ToastError, ToastSuccess } from '~/helpers/toastHelpers';
import {
  duyetDonDangKyRequest,
  getDanhSachChuaDuocDuyetRequest,
  resetDuyetDonDangKyState,
  resetXoaDonDangKyState,
  xoaDonDangKyRequest,
} from '~/redux/quanLyThuePhong/actions';
import ModalPreview from './components/ModalPreview';

const DanhSachChuaDuyet = () => {
  const {
    isGetDanhSachChuaDuocDuyetRequest,
    danhSachChuaDuocDuyetState,
    isDuyetDonDangKyRequest,
    isDuyetDonDangKySuccess,
    duyetDonDangKyState,
    isXoaDonDangKyRequest,
    isXoaDonDangKySuccess,
    xoaDonDangKyState,
  } = useSelector((store) => store.quanLyThuePhong);
  const dispatch = useDispatch();

  const [dataShow, setDataShow] = useState([]);
  const [isShowModalPreview, setIsShowModalPreview] = useState(false);
  const [dataActive, setDataActive] = useState(null);

  const columns = useMemo(
    () => [
      {
        Header: 'Mã đăng ký',
        accessor: 'ID',
        Cell: ({ value }) => <div className="cs-text-center">{value}</div>,
      },
      { Header: 'Họ & tên', accessor: 'hoTen' },
      {
        Header: 'Ngày sinh',
        accessor: 'ngaySinh',
        Cell: ({ value }) => (
          <div className="cs-text-center">
            {moment(value).format('DD/MM/YYYY')}
          </div>
        ),
      },
      {
        Header: 'Giới tính',
        accessor: 'gioiTinh',
        Cell: ({ value }) => (
          <div className="cs-text-center">{value ? 'Nữ' : 'Nam'}</div>
        ),
      },
      {
        Header: 'Khu nhà',
        accessor: 'khuNha',
        Cell: ({ value }) => <div className="cs-text-center">{value}</div>,
      },
      {
        Header: 'Số tháng thuê',
        accessor: 'kyHan',
        Cell: ({ value }) => <div className="cs-text-center">{value}</div>,
      },
      {
        Header: 'Ngày lập đơn',
        accessor: 'ngayLap',
        Cell: ({ value }) => (
          <div className="cs-text-center">
            {moment(value).format('DD/MM/YYYY')}
          </div>
        ),
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
        Header: 'Duyệt',
        accessor: '',
        Cell: ({ row }) => (
          <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip id="tooltip-disabled">Duyệt đơn</Tooltip>}
          >
            <div
              className="cs-text-center btn-action hover-opacity cursor-pointer"
              onClick={() => swalWarning(
                'Duyệt yêu cầu thuê phòng',
                'Bạn muốn xác nhận yêu cầu thuê phòng này?',
                'Đồng ý',
                'Huỷ',
                () => handleDuyetDonDangKy(row.values.ID),
                () => {},
              )}
            >
              <CSPencilAltSolid customClassName="fill-white" />
            </div>
          </OverlayTrigger>
        ),
      },
      {
        Header: 'Huỷ',
        accessor: '',
        Cell: ({ row }) => (
          <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip id="tooltip-disabled">Huỷ đơn</Tooltip>}
          >
            <div
              className="cs-text-center btn-action delete hover-opacity cursor-pointer"
              onClick={() => swalNegativeConfirmation(
                'Huỷ yêu cầu thuê phòng',
                'Bạn muốn xác nhận huỷ yêu cầu thuê phòng này?',
                'Đồng ý',
                'Huỷ',
                () => handleXoaDonDangKy(row.values.ID),
                () => {},
              )}
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
    setDataActive(value);
  };

  useEffect(() => {
    dispatch(getDanhSachChuaDuocDuyetRequest());

    return () => {
      dispatch(resetDuyetDonDangKyState());
      dispatch(resetXoaDonDangKyState());
    };
  }, []);

  useEffect(() => {
    if (danhSachChuaDuocDuyetState?.Items?.length > 0) {
      setDataShow(danhSachChuaDuocDuyetState?.Items);
    }
  }, [danhSachChuaDuocDuyetState]);

  const handleDuyetDonDangKy = (ID) => {
    dispatch(duyetDonDangKyRequest({ ID }));
  };

  const handleXoaDonDangKy = (ID) => {
    dispatch(xoaDonDangKyRequest({ ID }));
  };

  useEffect(() => {
    if (isDuyetDonDangKySuccess || isXoaDonDangKySuccess) {
      setDataActive(null);
      if (isDuyetDonDangKySuccess) {
        setDataShow(
          dataShow.filter(
            (item) => item.ID !== duyetDonDangKyState?.response?.ID,
          ),
        );
      } else if (isXoaDonDangKySuccess) {
        setDataShow(
          dataShow.filter((item) => item.ID !== xoaDonDangKyState?.response?.ID),
        );
      }
    }
  }, [isDuyetDonDangKySuccess, isXoaDonDangKySuccess]);

  return (
    <div className="danh-sach-chua-duyet">
      <TableShowAll
        columns={columns}
        data={dataShow}
        isLoading={isGetDanhSachChuaDuocDuyetRequest}
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

      {(isDuyetDonDangKyRequest || isDuyetDonDangKySuccess) && (
        <ToastSuccess
          show
          content="Đã duyệt đơn đăng ký thành công"
          isLoading={isDuyetDonDangKyRequest}
          theme="dark"
          contentLoading="Đang duyệt đơn đăng ký"
        />
      )}

      {(isXoaDonDangKyRequest || isXoaDonDangKySuccess) && (
        <ToastError
          show
          content="Đã xoá đơn đăng ký thành công"
          isLoading={isXoaDonDangKyRequest}
          theme="dark"
          contentLoading="Đang xoá đơn đăng ký"
        />
      )}
    </div>
  );
};

export default DanhSachChuaDuyet;
