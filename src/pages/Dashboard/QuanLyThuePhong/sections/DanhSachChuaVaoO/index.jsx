import moment from 'moment';
import { useEffect, useMemo, useState } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { CSPencilAltSolid, CSTrashSolid } from '~/components/iconography/Solid';
import TableShowAll from '~/components/table/tableShowAll';
import { swalNegativeConfirmation } from '~/helpers/swalHelpers';
import { ToastError, ToastSuccess } from '~/helpers/toastHelpers';
import {
  getDanhSachChuaVaoORequest,
  resetDuyetDonVaoOState,
  resetXoaDonDangKyState,
  xoaDonDangKyRequest,
} from '~/redux/quanLyThuePhong/actions';
import ModalPreview from './components/ModalPreview';

const DanhSachChuaVaoO = () => {
  const {
    isGetDanhSachChuaVaoORequest,
    danhSachChuaVaoOState,
    isDuyetDonVaoORequest,
    isDuyetDonVaoOSuccess,
    duyetDonVaoOState,
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
        Header: 'Duyệt',
        accessor: '',
        Cell: () => (
          <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip id="tooltip-disabled">Duyệt đơn</Tooltip>}
          >
            <div
              className="cs-text-center btn-action hover-opacity cursor-pointer"
              onClick={() => setIsShowModalPreview(true)}
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

  const handleXoaDonDangKy = (ID) => {
    dispatch(xoaDonDangKyRequest({ ID }));
  };

  useEffect(() => {
    dispatch(getDanhSachChuaVaoORequest());

    return () => {
      dispatch(resetDuyetDonVaoOState());
      dispatch(resetXoaDonDangKyState());
    };
  }, []);

  useEffect(() => {
    if (danhSachChuaVaoOState?.Items?.length > 0) {
      setDataShow(danhSachChuaVaoOState?.Items);
    }
  }, [danhSachChuaVaoOState]);

  useEffect(() => {
    if (isDuyetDonVaoOSuccess || isXoaDonDangKySuccess) {
      setDataActive(null);
      if (isDuyetDonVaoOSuccess) {
        setIsShowModalPreview(false);
        setDataShow(
          dataShow.filter(
            (item) => item.ID !== duyetDonVaoOState?.response?.maHopDong,
          ),
        );
      } else if (isXoaDonDangKySuccess) {
        setDataShow(
          dataShow.filter((item) => item.ID !== xoaDonDangKyState?.response?.ID),
        );
      }
    }
  }, [isDuyetDonVaoOSuccess]);

  return (
    <div className="danh-sach-chua-duyet danh-sach-chua-vao-o">
      <TableShowAll
        columns={columns}
        data={dataShow}
        isLoading={isGetDanhSachChuaVaoORequest}
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

      {(isDuyetDonVaoORequest || isDuyetDonVaoOSuccess) && (
        <ToastSuccess
          show
          content="Đã duyệt đơn vào ở thành công"
          isLoading={isDuyetDonVaoORequest}
          theme="dark"
          contentLoading="Đang duyệt đơn vào ở"
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

export default DanhSachChuaVaoO;
